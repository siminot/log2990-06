import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import * as WebRequest from "web-request";

import { TAILLE_TEST, POURCENTAGE_TEST } from "./constantes";
import { Mockword } from "./../../../common/mockObject/mockWord";
import { Mot } from "./../../../common/communication/Mot";

import { GenerateurSquelette } from "./generateurSquelette";
import { GenerateurListeMots } from "./generateurListeMots";

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;
        private listeMot: Array<Mockword>;
        // private tailleGrille: number = TAILLE_TEST;
        private generateurSquelette: GenerateurSquelette = new GenerateurSquelette(TAILLE_TEST, POURCENTAGE_TEST);
        private generateurListeMots: GenerateurListeMots = new GenerateurListeMots();
        private motsDejaPlaces: Array<string> = new Array<string>();

        constructor() {
            this.initMatrice();
        }

        private initMatrice(): void {
            this.listeMot = new Array<Mockword>();
            this.grille = new Array<Array<string>>();
            this.motsDejaPlaces = new Array<string>();
            this.grille = this.generateurSquelette.getSqueletteGrille();
            this.listeMot = this.generateurListeMots.donnerUneListe(this.grille);
        }

        /* FONCTION BIDON POUR EXAMINER DES CHOSES */
        public afficheGrille(req: Request, res: Response, next: NextFunction): void {
            this.initMatrice();
            // this.initListeMot();
            this.remplirLaGrilleDeMots(0);

            res.send(JSON.stringify(this.grille));
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

        private ecrireDansLaGrille(mot: Mockword): Promise<void> {
            const x = mot.getPremierX();
            const y = mot.getPremierY();

            for (let i = 0; i < mot.getLongueur(); i++) {
                if (mot.getVertical()) {
                    this.grille[y + i][x] = mot.getMot()[i];
                } else {
                    this.grille[y][x + i] = mot.getMot()[i];
                }
            }
            console.log(mot.getMot());
            console.log(this.grille);

            return new Promise( (resolve, reject) => {console.log("ok"); resolve(); } );
        }

        private remplirLaGrilleDeMots(ctr: number): void {
            const loop = (i: number) => {
                this.insererUnMot(i).then(() => {
                    if (i < this.listeMot.length - 1) {
                        i++;
                        loop(i++);
                    }
                })
                .catch( () => console.log("CA PLANTE"));
            };
            loop(ctr);
        }

        private insererUnMot(index: number): Promise<void> {
            this.lireMotViaGrille(this.listeMot[index]);

            return this.demanderMot(this.listeMot[index]).then( () => {
                this.ecrireDansLaGrille(this.listeMot[index]);
            });
        }

        private demanderMot(mot: Mockword): Promise<Mot[]> {
            const url = "http://localhost:3000/servicelexical/commun/contrainte/" + mot.getMot();

            return WebRequest.json<Mot[]>(url).then((data) => this.affecterMot(data, mot));
        }

        private affecterMot(listeMot: Mot[], motAChanger: Mockword): Mot[] {
            // regarder avec simon si on doit trouver un mot en particulier dans la liste
            const index = Math.floor( Math.random() * listeMot.length );
            motAChanger.setMot(listeMot[index].mot);
            motAChanger.setDefinition(listeMot[index].definitions[0].definition);
            // console.log(this.listeMot);

            return listeMot;
        }

        /* FONCTION BIDON POUR TESTER DES CHOSES */
        public afficheDifficile(req: Request, res: Response, next: NextFunction): void {
            res.send(JSON.stringify(this.listeMot));
        }

    }
}

export = Route;
