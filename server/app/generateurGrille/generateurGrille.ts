import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import * as WebRequest from "web-request";

import { TAILLE_TEST, VIDE, NOIR, TAILLE_TABLEAU, POURCENTAGE_TEST } from "./constantes";
import { Mockword } from "./../../../common/mockObject/mockWord";
import { Mot } from "./../../../common/communication/Mot";

import { GenerateurSquelette } from "./generateurSquelette";

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;
        private listeMot: Array<Mockword>;
        private tailleGrille: number = TAILLE_TEST;
        private generateurSquelette: GenerateurSquelette = new GenerateurSquelette(TAILLE_TABLEAU, POURCENTAGE_TEST);

        constructor() {
            this.initMatrice();
        }

        private initMatrice(): void {
            this.listeMot = new Array<Mockword>();
            this.grille = this.generateurSquelette.getSqueletteGrille();
        }

        private nettoyerMots(): void {
            this.listeMot.sort((n1, n2) => n2.getLongueur() - n1.getLongueur());
            while (this.listeMot[this.listeMot.length - 1].getLongueur() === 1) {
                this.listeMot.pop();
            }
        }

        /* FONCTION BIDON POUR TESTER DES CHOSES */
        public afficheGrille(req: Request, res: Response, next: NextFunction): void {
            this.initMatrice();
            this.initListeMot();
            this.remplirLaGrilleDeMots(0);

            res.send(JSON.stringify(this.grille));
        }

        public initListeMot(): void {
            this.genererListeMot();
        }

        public genererMot(x: number, y: number, estVertical: boolean): Mockword {

            if (x < 0 || y < 0) {
                throw new Error("Entree negative interdite");
            }

            let longMot = 0;
            let mot: String = "";
            for (let i: number = estVertical ? y : x; i < this.tailleGrille; i++) {
                if (this.grille[i][x] !== NOIR && estVertical) {
                    longMot++;
                    mot += "_";
                } else if (this.grille[y][i] !== NOIR && !estVertical) {
                    longMot++;
                    mot += "_";
                } else {
                    break;
                }
            }
            const nouveauMot: Mockword = new Mockword(estVertical, longMot, x, y);
            nouveauMot.setMot(mot);

            return nouveauMot;
        }

        public genererListeMot(): number {

            let ctrMots = 0;
            for (let i = 0; i < this.tailleGrille; i++) {
                for (let j = 0; j < this.tailleGrille; j++) {
                    if (this.grille[i][j] === VIDE) {
                        if (j === 0) {
                            this.listeMot.push(this.genererMot(j, i, false));
                            ctrMots++;
                        } else if (this.grille[i][j - 1] === NOIR) {   // Car je ne veux pas acceder a un espace memoire a [-1]
                             this.listeMot.push(this.genererMot(j, i, false));
                             ctrMots++;
                        }
                        if (i === 0) {
                            this.listeMot.push(this.genererMot(j, i, true));
                            ctrMots++;
                        } else if (this.grille[i - 1][j] === NOIR) {   // Car je ne veux pas acceder a un espace memoire a [-1]
                            this.listeMot.push(this.genererMot(j, i, true));
                            ctrMots++;
                        }
                    }
                }
            }
            this.nettoyerMots();

            return ctrMots;
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
            const url = "http://localhost:3000/servicelexical/liste/" + mot.getMot();

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
