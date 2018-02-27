import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import * as WebRequest from "web-request";

import { MotGenerationGrille } from "./motGenerateurGrille";
import { MockOptionPartie } from "./../../../common/mockObject/mockOptionPartie";
import { Mot } from "./../serviceLexical/Mot";

import { GenSquelette } from "./genSquelette";
import { GenerateurListeMots } from "./generateurListeMots";

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;
        private listeMot: Array<MotGenerationGrille>;
        private generateurSquelette: GenSquelette = new GenSquelette();
        private generateurListeMots: GenerateurListeMots = new GenerateurListeMots();
        private motsDejaPlaces: Map<string, number> = new Map();
        private requetesInvalides: Map<string, number> = new Map();
        private optionsPartie: MockOptionPartie;

        constructor() {
            this.initMatrice();
            this.optionsPartie = new MockOptionPartie("Facile", 1); // j'impose facile pour l'instant
        }

        private initMatrice(): void {
            this.listeMot = new Array<MotGenerationGrille>();
            this.grille = new Array<Array<string>>();
            this.grille = this.generateurSquelette.getSqueletteGrille();
            this.listeMot = this.generateurListeMots.donnerUneListe(this.grille);

            this.requetesInvalides.clear();
            this.requetesInvalides = new Map();
            this.motsDejaPlaces.clear();
            this.motsDejaPlaces = new Map();
        }

        private lireMotViaGrille(mot: MotGenerationGrille): void {
            let lecteur: string = "";
            const x: number = mot.getPremierX();
            const y: number = mot.getPremierY();

            for (let i: number = 0; i < mot.getLongueur(); i++) {
                if (mot.getVertical()) {
                    lecteur += this.grille[y + i][x];
                } else {
                    lecteur += this.grille[y][x + i];
                }
            }
            mot.setMot(lecteur);
        }

        private ecrireDansLaGrille(mot: MotGenerationGrille): void {
            const x: number = mot.getPremierX();
            const y: number = mot.getPremierY();

            for (let i: number = 0; i < mot.getLongueur(); i++) {
                if (mot.getVertical()) {
                    this.grille[y + i][x] = mot.getMot()[i];
                } else {
                    this.grille[y][x + i] = mot.getMot()[i];
                }
            }
        }

        private async remplirLaGrilleDeMots(): Promise<void> {
            while (!await this.remplirGrilleRecursif(0)) {
                this.motsDejaPlaces.clear();
            }
            // .catch((error) => console.log("wtf esti"));
        }

        private async remplirGrilleRecursif(indice: number): Promise<boolean> {

            const motActuel: MotGenerationGrille = this.listeMot[indice];
            this.lireMotViaGrille(motActuel);
            let lesMots: Mot[];
            const contrainte: string = motActuel.getMot();

            if (motActuel.getMot() in this.requetesInvalides) {
                return false;
            }
            lesMots = await this.demanderMot(motActuel);
            // Pas de mots trouve
            if (lesMots === undefined) {
                this.requetesInvalides[motActuel.getMot()] = 1;

                return false;
            }
            let prochainIndice: number;
            let ctr: number = 0;
            const DIX: number = 2; // A rajouter dans les constantes quand on va avoir un bon chiffre
            let prochainMotTrouve: boolean = false;
            let indiceAleatoire: number = 0;
            do {
                indiceAleatoire = this.nombreAleatoire(lesMots.length) - 1;
                // limiter le nombre d'essai pour chaque mot
                if (ctr++ === DIX || ctr >= lesMots.length) {
                    this.motsDejaPlaces.delete(motActuel.getMot());
                    motActuel.setMot(contrainte);
                    this.ecrireDansLaGrille(motActuel);
                    motActuel.setEstTraite(false);

                    return false;
                }
                // Verif si le mot est deja place dans la grille
                if (!(lesMots[indiceAleatoire].mot in this.motsDejaPlaces)) {
                    this.affecterMot(lesMots[indiceAleatoire], motActuel);
                    this.ecrireDansLaGrille(motActuel);
                    prochainIndice = this.obtenirLeMotLePlusImportant(motActuel);
                    if (prochainIndice === -1) {
                        this.motsDejaPlaces[motActuel.getMot()] = 1;

                        return true;
                    }
                }
                // console.log(this.grille);
                prochainMotTrouve = await this.remplirGrilleRecursif(prochainIndice);

            } while (!prochainMotTrouve);
            this.motsDejaPlaces[motActuel.getMot()] = 1;

            return true;
        }

        private obtenirLeMotLePlusImportant(mock: MotGenerationGrille): number {
            let max: number = 0;
            let indiceDuMax: number = -1;
            let temp: number;
            for (let i: number = 0; i < this.listeMot.length; i++) {
                if (!this.listeMot[i].getEstTraite()) {
                    temp = this.listeMot[i].getImportance(mock);
                    if (max < temp) {
                        max = temp;
                        indiceDuMax = i;
                    }
                }
            }

            return indiceDuMax;
        }

        private async demanderMot(mot: MotGenerationGrille): Promise<Mot[]> {

            let url: string;
            switch (this.optionsPartie.niveau) {

                case "facile":
                case "normal":
                url = "http://localhost:3000/servicelexical/commun/contrainte/" + mot.getMot();
                break;

                case "difficile":
                url = "http://localhost:3000/servicelexical/noncommun/contrainte/" + mot.getMot();
                break;

                default: /*devrait jamais arriver?*/ break;
            }

            return WebRequest.json<Mot[]>(url);
        }

        private affecterMot(unMot: Mot, motAChanger: MotGenerationGrille): Mot {
            // regarder avec simon si on doit trouver un mot en particulier dans la liste
            let indexDef: number = 0;
            const nbDef: number = unMot.definitions.length;
            switch (this.optionsPartie.niveau) {

                case "Normal":
                case "Difficile":
                if (unMot.definitions.length > 0) {    // S'il n'y a aucune autre def
                    indexDef = this.nombreAleatoire(nbDef) - 1;
                }
                break;

                default: /*devrait jamais arriver?*/ break;
            }

            motAChanger.setMot(unMot.mot);
            motAChanger.setDefinition(unMot.definitions[indexDef].definition);
            motAChanger.setEstTraite(true);

            return unMot;
        }

        // retourne un nombre entre 1 et nbMax
        private nombreAleatoire(nbMax: number): number {
            const millisecondes: number = new Date().getMilliseconds();
            const MILLE: number = 1000;

            return Math.floor(millisecondes * nbMax / MILLE) + 1;
        }

        public async requeteDeGrille(req: Request, res: Response, next: NextFunction): Promise<void> {
            this.optionsPartie.setDifficultee(req.params.difficulte);
            this.initMatrice();
            await this.remplirLaGrilleDeMots();
            res.send(this.listeMot);
        }

    }
}

export = Route;
