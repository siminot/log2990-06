import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import * as WebRequest from "web-request";

import { TAILLE_TEST, POURCENTAGE_NOIR } from "./constantes";
import { Mockword } from "./../../../common/mockObject/mockWord";
import { MockOptionPartie } from "./../../../common/mockObject/mockOptionPartie";
import { Mot } from "./../serviceLexical/Mot";

import { GenerateurSquelette } from "./generateurSquelette";
import { GenerateurListeMots } from "./generateurListeMots";

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;
        private listeMot: Array<Mockword>;
        private generateurSquelette: GenerateurSquelette = new GenerateurSquelette(TAILLE_TEST, POURCENTAGE_NOIR);
        private generateurListeMots: GenerateurListeMots = new GenerateurListeMots();
        private motsDejaPlaces: Map<string, number> = new Map();
        private optionsPartie: MockOptionPartie;
        private listeMotsRemplis: Array<Mockword>;

        constructor() {
            this.initMatrice();
            this.optionsPartie = new MockOptionPartie("Facile", 1); // j'impose facile pour l'instant
        }

        private initMatrice(): void {
            this.listeMot = new Array<Mockword>();
            this.grille = new Array<Array<string>>();
            this.listeMotsRemplis = new Array<Mockword>();
            this.grille = this.generateurSquelette.getSqueletteGrille();
            this.listeMot = this.generateurListeMots.donnerUneListe(this.grille);
        }

        private lireMotViaGrille(mot: Mockword) {
            let lecteur = "";
            const x = mot.getPremierX();
            const y = mot.getPremierY();

            for (let i = 0; i < mot.getLongueur(); i++) {
                if (mot.getVertical()) {
                    lecteur += this.grille[y + i][x];
                } else {
                    lecteur += this.grille[y][x + i];
                }
            }
            mot.setMot(lecteur);
        }

        private ecrireDansLaGrille(mot: Mockword): void {
            const x = mot.getPremierX();
            const y = mot.getPremierY();

            for (let i = 0; i < mot.getLongueur(); i++) {
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
                console.log("un essai de pas reussi");
            }
            // .catch((error) => console.log("wtf esti"));
        }

        private async remplirGrilleRecursif(indice: number): Promise<boolean> {

            const motActuel: Mockword = this.listeMot[indice];
            this.lireMotViaGrille(motActuel);
            let lesMots: Mot[];
            const contrainte = motActuel.getMot();
            lesMots = await this.demanderMot(motActuel);
            if (lesMots === undefined) {
                return false;
            }
            let prochainIndice: number;
            let ctr = 0;
            const DIX = 2; // A rajouter dans les constantes quand on va avoir un bon chiffre
            let prochainMotTrouve = false;
            let indiceAleatoire = 0;
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

        private obtenirLeMotLePlusImportant(mock: Mockword): number {
            let max = 0;
            let indiceDuMax = -1;
            let temp: number;
            for (let i = 0; i < this.listeMot.length; i++) {
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

        private async demanderMot(mot: Mockword): Promise<Mot[]> {

            let url: string;
            switch (this.optionsPartie.niveau) {

                case "Facile":
                case "Normal":
                url = "http://localhost:3000/servicelexical/commun/contrainte/" + mot.getMot();
                break;

                case "Difficile":
                url = "http://localhost:3000/servicelexical/noncommun/contrainte/" + mot.getMot();
                break;

                default: /*devrait jamais arriver?*/ break;
            }

            return WebRequest.json<Mot[]>(url);
        }

        private affecterMot(unMot: Mot, motAChanger: Mockword): Mot {
            // regarder avec simon si on doit trouver un mot en particulier dans la liste
            let indexDef = 0;
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
            const millisecondes = new Date().getMilliseconds();
            const MILLE = 1000;

            return Math.floor(millisecondes * nbMax / MILLE) + 1;
        }

                /* FONCTION BIDON POUR EXAMINER DES CHOSES */
        public afficheGrille(req: Request, res: Response, next: NextFunction): void {
            this.initMatrice();
            // this.initListeMot();
            this.remplirLaGrilleDeMots();
            res.send(JSON.stringify(this.grille));
        }

        public async prototypeRequete(req: Request, res: Response, next: NextFunction): Promise<void> {

            this.listeMot = new Array<Mockword>();
            this.grille = new Array<Array<string>>();
            this.motsDejaPlaces.clear();
            this.motsDejaPlaces = new Map();
            this.grille = [["_", "_", "_", "_", "_", "_" , "_", "_", "_", "_"],
                           ["_", "0", "_", "0", "0", "0" , "0", "0", "0", "_"],
                           ["_", "0", "_", "_", "_", "_" , "_", "_", "_", "_"],
                           ["_", "_", "_", "0", "0", "_" , "0", "0", "0", "_"],
                           ["_", "0", "_", "0", "0", "_" , "0", "_", "_", "_"],
                           ["0", "0", "_", "0", "_", "_" , "_", "0", "0", "_"],
                           ["_", "0", "_", "0", "_", "0" , "0", "_", "_", "_"],
                           ["_", "0", "_", "0", "_", "0" , "0", "0", "0", "0"],
                           ["_", "_", "_", "0", "_", "0" , "0", "0", "0", "0"],
                           ["_", "0", "0", "0", "0", "_" , "_", "_", "_", "_"]];

            this .listeMot = this.generateurListeMots.donnerUneListe(this.grille);
            await this.remplirLaGrilleDeMots();
            console.log(this.grille);

            res.send(this.listeMot);
        }

        /* FONCTION BIDON POUR TESTER DES CHOSES */
        public afficheDifficile(req: Request, res: Response, next: NextFunction): void {
            res.send(JSON.stringify(this.listeMot));
        }

    }
}

export = Route;
