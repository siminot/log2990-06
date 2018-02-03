import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
// import * as WebRequest from "web-request";

import { TAILLE_TEST, VIDE, NOIR, POURCENTAGE_TEST } from "./constantes";
import { Mockword } from "./../../../common/mockObject/mockWord";
// import { Mot } from "./../../../common/communication/Mot";

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;
        private listeMot: Array<Mockword> = new Array<Mockword>();
        private tailleGrille: number = TAILLE_TEST;

        constructor() {
            this.initMatrice();
        }

        private initMatrice(): void {
            this.grille = new Array(this.tailleGrille).fill(VIDE);
            for (let i = 0; i < this.tailleGrille; i++) {
                this.grille[i] = new Array(this.tailleGrille).fill(VIDE);
            }
            this.listeMot = new Array<Mockword>();
        }

        private nettoyerMots(): void {
            this.listeMot.sort((n1, n2) => n2.getLongueur() - n1.getLongueur());
            while (this.listeMot[this.listeMot.length - 1].getLongueur() === 1) {
                this.listeMot.pop();
            }
        }

        // ratioVoulu: float entre 0 et 1
        private genererCasesNoires(ratioVoulu: number): number {
            // Verifier une bonne entree
            if (ratioVoulu < 0 || ratioVoulu > 1) {
            return null;
            }

            const nombreCases = Math.ceil(this.tailleGrille * this.tailleGrille * ratioVoulu);
            let compteurCasesNoires = 0;
            let x = 0;
            let y = 0;

            while (compteurCasesNoires < nombreCases) {
                // On genere une position aleatoire
                x = Math.floor(Math.random() * this.tailleGrille);
                y = Math.floor(Math.random() * this.tailleGrille);
                if (this.verifCaseNoire(x, y)) {
                    this.grille[y][x] = NOIR;
                    compteurCasesNoires++;
                }
            }

            return nombreCases;
        }

        private verifCaseNoire(positionX: number, positionY: number): boolean {

            if (this.grille[positionY][positionX] === NOIR) {
                return false;
            }

            this.grille[positionY][positionX] = NOIR;
            let caseDisponible = true;

            caseDisponible = this.neGenerePasDeTrou(positionX - 1, positionY);
            if (caseDisponible) {
                caseDisponible = this.neGenerePasDeTrou(positionX + 1, positionY);
            }
            if (caseDisponible) {
                caseDisponible = this.neGenerePasDeTrou(positionX, positionY - 1);
            }
            if (caseDisponible) {
                caseDisponible = this.neGenerePasDeTrou(positionX, positionY + 1);
            }

            this.grille[positionY][positionX] = "0";

            return caseDisponible;
        }

        private neGenerePasDeTrou(positionX: number, positionY: number): boolean {

            if (positionX < 0 || positionY < 0 || positionX >= this.tailleGrille || positionY >= this.tailleGrille ) {
                return true;
            }
            if (this.grille[positionY][positionX] === NOIR) {
                return true;
            }
            if (positionY - 1 > 0) {
                if (this.grille[positionY - 1][positionY] === VIDE) {
                    return true;
                }
            }
            if (positionY + 1 < this.tailleGrille) {
                if (this.grille[positionY + 1][positionX] === VIDE) {
                    return true;
                }
            }
            if (positionX - 1 > 0) {
                if (this.grille[positionY][positionX - 1] === VIDE) {
                    return true;
                }
            }
            if (positionX + 1 < this.tailleGrille) {
                if (this.grille[positionY][positionX + 1] === VIDE) {
                    return true;
                }
            }

            return false;
        }

        /* FONCTION BIDON POUR TESTER DES CHOSES */
        public afficheGrille(req: Request, res: Response, next: NextFunction): void {
            this.initMatrice();
            this.initCasesNoires(POURCENTAGE_TEST);
            this.initListeMot();
            res.send(JSON.stringify(this.grille));
        }

        public initListeMot(): void {

            this.genererListeMot();
        }

        public genererMot(x: number, y: number, estVertical: boolean): Mockword {

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
            // console.log("Position (" + x + ", " + y + ") "+longMot);
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

        // private demanderMot(mot: Mockword): Promise<Mot[]> {
        //     const url = "/liste/" + mot.getMot;

        //     return WebRequest.json<Mot[]>(url).then();
        // }

                /* FONCTION BIDON POUR TESTER DES CHOSES */
        public afficheDifficile(req: Request, res: Response, next: NextFunction): void {
            res.send(JSON.stringify("DIFFICILE"));
        }

        // Interface pour tests...
        public initCasesNoires(ratioVoulu: number): number {
            this.initMatrice();

            return this.genererCasesNoires(ratioVoulu);
        }
    }
}

export = Route;
