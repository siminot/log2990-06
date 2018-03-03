import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import * as WebRequest from "web-request";

import { Mot } from "./mot";
import { ConfigurationPartie } from "./configurationPartie";
import { Difficultees, REQUETE_COMMUN, REQUETE_NONCOMMUN } from "./constantes";

import { GenSquelette } from "./genSquelette";
import { GenerateurListeMots } from "./generateurListeMots";

const NB_ESSAIS_MAX: number = 2;

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;
        private listeMot: Array<Mot>;
        private generateurSquelette: GenSquelette;
        private generateurListeMots: GenerateurListeMots;
        private motsDejaPlaces: Map<string, number> ;
        private requetesInvalides: Map<string, number>;
        private optionsPartie: ConfigurationPartie;

        constructor() {
            this.generateurListeMots = new GenerateurListeMots();
            this.generateurSquelette = new GenSquelette();
            this.initGrille();
            this.optionsPartie = new ConfigurationPartie("Facile", 1);
        }

        private initGrille(): void {
            this.initListeDeMots();
            this.initialisationDesMapsDeMots();
        }

        private initListeDeMots(): void {
            this.grille = new Array<Array<string>>();
            this.listeMot = new Array<Mot>();
            this.grille = this.generateurSquelette.getSqueletteGrille();
            this.listeMot = this.generateurListeMots.donnerUneListe(this.grille);
        }

        private initialisationDesMapsDeMots(): void {
            this.requetesInvalides = new Map();
            this.requetesInvalides.clear();
            this.motsDejaPlaces = new Map();
            this.motsDejaPlaces.clear();
        }

        private lireMotViaGrille(mot: Mot): void {
            let lecteur: string = "";
            for (let i: number = 0; i < mot.longueur; i++) {
                mot.estVertical ?
                lecteur += this.grille[mot.premierY + i][mot.premierX] :
                lecteur += this.grille[mot.premierY][mot.premierX + i];
            }
            mot.mot = lecteur;
        }

        private ecrireDansLaGrille(mot: Mot): void {
            for (let i: number = 0; i < mot.longueur; i++) {
                if (mot.estVertical) {
                    this.grille[mot.premierY + i][mot.premierX] = mot.mot[i];
                } else {
                    this.grille[mot.premierY][mot.premierX + i] = mot.mot[i];
                }
            }
        }

        private async remplirLaGrilleDeMots(): Promise<void> {
            while (!await this.remplirGrilleRecursif(0)) {
                this.motsDejaPlaces.clear();
            }
        }

        private async remplirGrilleRecursif(indice: number): Promise<boolean> {

            const motActuel: Mot = this.listeMot[indice];
            this.lireMotViaGrille(motActuel);
            const contrainteDuMot: string = motActuel.mot;
            if (contrainteDuMot in this.requetesInvalides) {
                return false;
            }
            const lesMotsRecus: Mot[] = await this.demanderMot(motActuel);
            if (lesMotsRecus === undefined) {
                this.requetesInvalides[motActuel.mot] = 1;

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
                    this.motsDejaPlaces[motActuel.mot] = 1;

                    return true;
                }
            } while (!(await this.remplirGrilleRecursif(prochainIndice)));
            this.motsDejaPlaces[motActuel.mot] = 1;

            return true;
        }

        private retourEtatAvantMot(motActuel: Mot, contrainteDuMot: string): void {
            this.motsDejaPlaces.delete(motActuel.mot);
            motActuel.mot = contrainteDuMot;
            this.ecrireDansLaGrille(motActuel);
            motActuel.estTraite = false;
        }

        private obtenirIndiceMotPlusImportant(leMot: Mot): number {
            let max: number = 0;
            let indiceDuMax: number = -1;
            for (const mot of this.listeMot) {
                if (!mot.estTraite) {
                    if (max < mot.getImportance(leMot)) {
                        max = mot.getImportance(leMot);
                        indiceDuMax = this.listeMot.indexOf(mot);
                    }
                }
            }

            return indiceDuMax;
        }

        private async demanderMot(mot: Mot): Promise<Mot[]> {
            let url: string;
            this.optionsPartie.niveauDeDifficulte === Difficultees.Difficile ? url = REQUETE_NONCOMMUN : url = REQUETE_COMMUN;
            url += mot.mot;

            return WebRequest.json<Mot[]>(url);
        }

        private affecterMot(unMot: Mot, motAChanger: Mot): Mot {
            let indexDef: number = 0;
            if (this.optionsPartie.niveauDeDifficulte !== Difficultees.Facile) {
                if (unMot.definitions.length > 0) {
                    indexDef = this.nombreAleatoire(unMot.definitions.length) - 1;
                }
            }
            this.modifierLeMot(motAChanger, unMot, indexDef);

            return unMot;
        }

        private modifierLeMot(motAChanger: Mot, unMot: Mot, indexDef: number): void {
            motAChanger.mot = unMot.mot;
            motAChanger.definitions[indexDef].definition = unMot.definitions[indexDef].definition;
            motAChanger.estTraite = true;
        }

        private nombreAleatoire(nbMax: number): number {
            const millisecondes: number = new Date().getMilliseconds();
            const MILLE: number = 1000;

            return Math.floor(millisecondes * nbMax / MILLE) + 1;
        }

        public async requeteDeGrille(req: Request, res: Response, next: NextFunction): Promise<void> {
            this.optionsPartie.niveauDeDifficulte = (req.params.difficulte);
            this.initGrille();
            await this.remplirLaGrilleDeMots();
            res.send(this.listeMot);
        }

    }
}

export = Route;
