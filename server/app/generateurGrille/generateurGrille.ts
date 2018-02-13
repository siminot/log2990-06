import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import * as WebRequest from "web-request";

import { TAILLE_TEST, POURCENTAGE_TEST } from "./constantes";
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
        private generateurSquelette: GenerateurSquelette = new GenerateurSquelette(TAILLE_TEST, POURCENTAGE_TEST);
        private generateurListeMots: GenerateurListeMots = new GenerateurListeMots();
        private motsDejaPlaces: Array<string> = new Array<string>();
        private optionsPartie: MockOptionPartie;
        private listeMotsRemplis: Array<Mockword>;

        constructor() {
            this.initMatrice();
            this.optionsPartie = new MockOptionPartie("Facile", 1); // j'impose facile pour l'instant
        }

        private initMatrice(): void {
            this.listeMot = new Array<Mockword>();
            this.grille = new Array<Array<string>>();
            this.motsDejaPlaces = new Array<string>();
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
            mot.setEtatAvantEcriture(lecteur);
        }

        private remplirLaGrilleDeMots() {
            this.remplirGrilleRecursif(0)
            .then(() =>  { console.log("ca marche"); console.log(this.grille); });
            // .catch((error) => console.log("wtf esti"));
        }

        private async remplirGrilleRecursif(indice: number): Promise<boolean> {

            // indice++;
            this.lireMotViaGrille(this.listeMot[indice]);
            let lesMots: Mot[];
            const contrainte = this.listeMot[indice].getMot();
            lesMots = await this.demanderMot(this.listeMot[indice]);
            if (lesMots === undefined) {
                console.log("pas de mot");

                return false;
                // throw new Error("Pas de mot");
            }
            let prochainIndice: number;
            let ctr = 0;
            const DIX = 2;
            let prochainMotTrouve = false;
            do {
                if (ctr++ === DIX || ctr >= lesMots.length) {
                    this.listeMot[indice].setMot(contrainte);
                    this.ecrireDansLaGrille(this.listeMot[indice]);
                    this.listeMot[indice].setEstTraite(false);

                    return false;
                }
                console.log("ctr : " + ctr + " indice : " + indice);
                this.affecterMot(lesMots[this.nombreAleatoire(lesMots.length) - 1], this.listeMot[indice]);
                this.ecrireDansLaGrille(this.listeMot[indice]);
                prochainIndice = this.obtenirLeMotLePlusImportant(this.listeMot[indice]);
                if (prochainIndice === -1) {
                    return true;
                }
                console.log(this.grille);
                prochainMotTrouve = await this.remplirGrilleRecursif(prochainIndice);

            } while (!prochainMotTrouve);

            return true;
        }

        private obtenirLeMotLePlusImportant(mock: Mockword): number {
            let max = 0;
            let indiceDuMax = -1;
            for (let i = 0; i < this.listeMot.length; i++) {
                if (!this.listeMot[i].getEstTraite()) {
                    if (max <= this.listeMot[i].getImportance(mock)) {
                        max = this.listeMot[i].getImportance(mock);
                        indiceDuMax = i;
                    }
                }
            }

            return indiceDuMax;
        }

        private demanderMot(mot: Mockword): Promise<Mot[]> {

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

        // retourne un nmbre entre 1 et nbMax
        private nombreAleatoire(nbMax: number): number {
            const millisecondes = new Date().getMilliseconds();
            console.log(millisecondes);
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

        /* FONCTION BIDON POUR TESTER DES CHOSES */
        public afficheDifficile(req: Request, res: Response, next: NextFunction): void {
            res.send(JSON.stringify(this.listeMot));
        }

    }
}

export = Route;
