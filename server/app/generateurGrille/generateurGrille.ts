import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import * as WebRequest from "web-request";

import { MotGenerationGrille } from "./motGenerateurGrille";
import { MockOptionPartie } from "./../../../common/mockObject/mockOptionPartie";
import { Mot } from "./../serviceLexical/Mot";
import { Difficultees, REQUETE_COMMUN, REQUETE_NONCOMMUN } from "./constantes";

import { GenSquelette } from "./genSquelette";
import { GenerateurListeMots } from "./generateurListeMots";

const NB_ESSAIS_MAX: number = 2;

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;
        private listeMot: Array<MotGenerationGrille>;
        private generateurSquelette: GenSquelette;
        private generateurListeMots: GenerateurListeMots;
        private motsDejaPlaces: Map<string, number> ;
        private requetesInvalides: Map<string, number>;
        private optionsPartie: MockOptionPartie;

        constructor() {
            this.generateurListeMots = new GenerateurListeMots();
            this.generateurSquelette = new GenSquelette();
            this.initGrille();
            this.optionsPartie = new MockOptionPartie("Facile", 1);
        }

        private initGrille(): void {
            this.initListeDeMots();
            this.initialisationDesMapsDeMots();
        }

        private initListeDeMots(): void {
            this.grille = new Array<Array<string>>();
            this.listeMot = new Array<MotGenerationGrille>();
            this.grille = this.generateurSquelette.getSqueletteGrille();
            this.listeMot = this.generateurListeMots.donnerUneListe(this.grille);
        }

        private initialisationDesMapsDeMots(): void {
            this.requetesInvalides = new Map();
            this.requetesInvalides.clear();
            this.motsDejaPlaces = new Map();
            this.motsDejaPlaces.clear();
        }

        private lireMotViaGrille(mot: MotGenerationGrille): void {
            let lecteur: string = "";
            for (let i: number = 0; i < mot.getLongueur(); i++) {
                if (mot.getVertical()) {
                    lecteur += this.grille[mot.getPremierY() + i][mot.getPremierX()];
                } else {
                    lecteur += this.grille[mot.getPremierY()][mot.getPremierX() + i];
                }
            }
            mot.setMot(lecteur);
        }

        private ecrireDansLaGrille(mot: MotGenerationGrille): void {
            for (let i: number = 0; i < mot.getLongueur(); i++) {
                if (mot.getVertical()) {
                    this.grille[mot.getPremierY() + i][mot.getPremierX()] = mot.getMot()[i];
                } else {
                    this.grille[mot.getPremierY()][mot.getPremierX() + i] = mot.getMot()[i];
                }
            }
        }

        private async remplirLaGrilleDeMots(): Promise<void> {
            while (!await this.remplirGrilleRecursif(0)) {
                this.motsDejaPlaces.clear();
            }
        }

        private async remplirGrilleRecursif(indice: number): Promise<boolean> {

            const motActuel: MotGenerationGrille = this.listeMot[indice];
            this.lireMotViaGrille(motActuel);
            const contrainteDuMot: string = motActuel.getMot();
            if (contrainteDuMot in this.requetesInvalides) {
                return false;
            }
            const lesMotsRecus: Mot[] = await this.demanderMot(motActuel);
            if (lesMotsRecus === undefined) {
                this.requetesInvalides[motActuel.getMot()] = 1;

                return false;
            }
            let prochainIndice: number;
            let nbEssaisPourMemeMot: number = 0;
            let indiceAleatoire: number = 0;
            do {
                indiceAleatoire = this.nombreAleatoire(lesMotsRecus.length) - 1;
                // limiter le nombre d'essai pour chaque mot
                if (nbEssaisPourMemeMot++ === NB_ESSAIS_MAX || nbEssaisPourMemeMot >= lesMotsRecus.length) {
                    this.retourEtatAvantMot(motActuel, contrainteDuMot);

                    return false;
                }
                if (!(lesMotsRecus[indiceAleatoire].mot in this.motsDejaPlaces)) {
                    this.affecterMot(lesMotsRecus[indiceAleatoire], motActuel);
                    this.ecrireDansLaGrille(motActuel);
                    prochainIndice = this.obtenirIndiceMotPlusImportant(motActuel);
                } else { nbEssaisPourMemeMot--; }

                if (prochainIndice === -1) { // Detection de la fin!
                    this.motsDejaPlaces[motActuel.getMot()] = 1;

                    return true;
                }
            } while (!(await this.remplirGrilleRecursif(prochainIndice)));
            this.motsDejaPlaces[motActuel.getMot()] = 1;

            return true;
        }

        private retourEtatAvantMot(motActuel: MotGenerationGrille, contrainteDuMot: string): void {
            this.motsDejaPlaces.delete(motActuel.getMot());
            motActuel.setMot(contrainteDuMot);
            this.ecrireDansLaGrille(motActuel);
            motActuel.setEstTraite(false);
        }

        private obtenirIndiceMotPlusImportant(leMot: MotGenerationGrille): number {
            let max: number = 0;
            let indiceDuMax: number = -1;
            for (const mot of this.listeMot) {
                if (!mot.getEstTraite()) {
                    if (max < mot.getImportance(leMot)) {
                        max = mot.getImportance(leMot);
                        indiceDuMax = this.listeMot.indexOf(mot);
                    }
                }
            }

            return indiceDuMax;
        }

        private async demanderMot(mot: MotGenerationGrille): Promise<Mot[]> {
            let url: string;
            this.optionsPartie.niveau === Difficultees.Difficile ? url = REQUETE_NONCOMMUN : url = REQUETE_COMMUN;
            url += mot.getMot();

            return WebRequest.json<Mot[]>(url);
        }

        private affecterMot(unMot: Mot, motAChanger: MotGenerationGrille): Mot {
            let indexDef: number = 0;
            if (this.optionsPartie.niveau !== Difficultees.Facile) {
                if (unMot.definitions.length > 0) {
                    indexDef = this.nombreAleatoire(unMot.definitions.length) - 1;
                }
            }
            this.modofierLeMot(motAChanger, unMot, indexDef);

            return unMot;
        }

        private modofierLeMot(motAChanger: MotGenerationGrille, unMot: Mot, indexDef: number): void {
            motAChanger.setMot(unMot.mot);
            motAChanger.setDefinition(unMot.definitions[indexDef].definition);
            motAChanger.setEstTraite(true);
        }

        private nombreAleatoire(nbMax: number): number {
            const millisecondes: number = new Date().getMilliseconds();
            const MILLE: number = 1000;

            return Math.floor(millisecondes * nbMax / MILLE) + 1;
        }

        public async requeteDeGrille(req: Request, res: Response, next: NextFunction): Promise<void> {
            this.optionsPartie.setDifficultee(req.params.difficulte);
            this.initGrille();
            await this.remplirLaGrilleDeMots();
            res.send(this.listeMot);
        }

    }
}

export = Route;
