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

        constructor() {
            this.initMatrice();
            this.optionsPartie = new MockOptionPartie("Facile", 1); // j'impose facile pour l'instant
        }

        private initMatrice(): void {
            this.listeMot = new Array<Mockword>();
            this.grille = new Array<Array<string>>();
            this.motsDejaPlaces = new Array<string>();
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

        private remplirLaGrilleDeMots() {
            this.remplirGrilleRecursif(0)
            .then(() =>  console.log("ca marche"))
            .catch(() => console.log("ca foire"));
        }

        private async remplirGrilleRecursif(indice: number): Promise<void> {
            this.lireMotViaGrille(this.listeMot[indice]);
            this.demanderMot(this.listeMot[indice])
            .then((data) => {
                const loop = (i: number) => {
                    this.affecterMot(data[i], this.listeMot[indice]);
                    this.remplirGrilleRecursif(indice++)
                    .catch(() => loop(i++));
                };
                loop(0);
            });

            return;
        }

       /* private remplirLaGrilleDeMots(ctr: number): void {
            const loop = (i: number) => {
                this.insererUnMot(i).then(() => {
                    if (i < this.listeMot.length - 1) {
                        i++;
                        loop(i++);
                    }
                })
                .catch( (resolve) => console.log("Erreur"));
            };
            loop(ctr);
        }*/

       /* private updateListeMot(mot: Mockword): void {
            const indexConstant = mot.getVertical() ? mot.getPremierX() : mot.getPremierY();

            for (const elem of this.listeMot) {
                if (elem.getVertical() !== mot.getVertical()) {
                    const premierIndex = elem.getVertical() ? elem.getPremierY() : elem.getPremierX();
                    const dernierIndex = premierIndex + elem.getLongueur() - 1;
                    const indexCharAModifier = mot.getVertical() ?
                    elem.getPremierY() - mot.getPremierY() : elem.getPremierX() - mot.getPremierX();

                    if (premierIndex <= indexConstant && indexConstant < dernierIndex ) {
                        let motModifie = elem.getMot();
                        const indexAModifier = indexConstant - premierIndex;
                        motModifie = motModifie.substring(0, indexAModifier)
                                      + mot.getMot().charAt(indexCharAModifier) + motModifie.substring(indexAModifier + 1);
                        console.log(elem);
                        elem.setMot(motModifie);
                    }
                }
            }
        }*/

       /* private insererUnMot(index: number): Promise<void> {
            this.lireMotViaGrille(this.listeMot[index]);

            return this.demanderMot(this.listeMot[index]).then( (data) => {
                this.updateListeMot(this.listeMot[index])
                .then();

                const loop = (i: number ) => {

                    })
                    .catch( (resolve) => console.log("Erreur"));
                };
                loop(ctr);
            });
        }*/

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
                    indexDef = this.nombreAlleatoire(nbDef) - 1;
                }
                break;

                default: /*devrait jamais arriver?*/ break;
            }

            motAChanger.setMot(unMot.mot);
            motAChanger.setDefinition(unMot.definitions[indexDef].definition);

            return unMot;
        }

       /* private ecrireDansLaGrille(mot: Mockword): Promise<void> {
            const x = mot.getPremierX();
            const y = mot.getPremierY();

            for (let i = 0; i < mot.getLongueur(); i++) {
                if (mot.getVertical()) {
                    this.grille[y + i][x] = mot.getMot()[i];
                } else {
                    this.grille[y][x + i] = mot.getMot()[i];
                }
            }
            // console.log(mot.getMot());
            // console.log(this.grille);

            return new Promise( (resolve, reject) => { resolve(); } );
        }*/

        // retourne un nmbre entre 1 et nbMax
        private nombreAlleatoire(nbMax: number): number {
            const millisecondes = new Date().getMilliseconds();
            const MILLE = 1000;

            return Math.floor(millisecondes * nbMax / MILLE) + 1;
        }

                /* FONCTION BIDON POUR EXAMINER DES CHOSES */
        public afficheGrille(req: Request, res: Response, next: NextFunction): void {
            this.initMatrice();
            // this.initListeMot();
            res.send(JSON.stringify(this.grille));
        }

        /* FONCTION BIDON POUR TESTER DES CHOSES */
        public afficheDifficile(req: Request, res: Response, next: NextFunction): void {
            res.send(JSON.stringify(this.listeMot));
        }

    }
}

export = Route;
