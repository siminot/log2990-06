import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";

import { TAILLE_TEST, VIDE, NOIR } from "./constantes";
import { Mockword } from  "./../../../common/mockObject/mockWord"

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;
        private listeMot: Array<Mockword> = new Array<Mockword>();
        private tailleGrille: number = TAILLE_TEST;

        constructor() {
            this.initMatrice();
        }

        //Fonction pour tester la creation des mots
        public setGrile(grille: Array<Array<string>>): void {
            this.grille = grille
        }

        private initMatrice(): void {
            this.grille = new Array(this.tailleGrille).fill(VIDE);
            for (let i: number = 0; i < this.tailleGrille; i++) {
                this.grille[i] = new Array(this.tailleGrille).fill(VIDE);
            }
        }

        //ratioVoulu: float entre 0 et 1
        private genererCasesNoires(ratioVoulu: number): number {
            //Verifier une bonne entree
            if (ratioVoulu < 0 || ratioVoulu > 1)
            return null;

            let nombreCases: number = Math.ceil(this.tailleGrille * this.tailleGrille * ratioVoulu);
            let compteurCasesNoires: number = 0;
            let x: number = 0;
            let y: number = 0;

            while(compteurCasesNoires < nombreCases) {
                //On genere une position aleatoire
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

            if (this.grille[positionY][positionX] == NOIR)
                return false;

            this.grille[positionY][positionX] = NOIR;
            let caseDisponible: boolean = true;

            caseDisponible = this.neGenerePasDeTrou(positionX - 1, positionY);
            if (caseDisponible)
                caseDisponible = this.neGenerePasDeTrou(positionX + 1, positionY);
            if (caseDisponible)
                caseDisponible = this.neGenerePasDeTrou(positionX, positionY - 1);
            if (caseDisponible)
                caseDisponible = this.neGenerePasDeTrou(positionX, positionY + 1);
            
            this.grille[positionY][positionX] = "0";

            return caseDisponible;
        }

        private neGenerePasDeTrou(positionX: number, positionY: number): boolean {

            if (positionX < 0 || positionY <0 || positionX >= this.tailleGrille || positionY >= this.tailleGrille )
                return true;
            if(this.grille[positionY][positionX] == NOIR)
                return true;
                
            if (positionY - 1 > 0)
                if(this.grille[positionY - 1][positionY] == VIDE)
                    return true;
            if (positionY + 1 < this.tailleGrille)
                if(this.grille[positionY + 1][positionX] == VIDE)
                    return true;
            if (positionX - 1 > 0)
                if(this.grille[positionY][positionX - 1] == VIDE)
                    return true;
            if (positionX + 1 < this.tailleGrille)
                if(this.grille[positionY][positionX + 1] == VIDE)
                    return true;

            return false;
        }

        /* FONCTION BIDON POUR TESTER DES CHOSES */
        public afficheGrille(req: Request, res: Response, next: NextFunction): void {
            this.initMatrice();
            this.initCasesNoires(.25);
            this.initListeMot();            
            res.send(JSON.stringify(this.grille));
        }

        /* FONCTION BIDON POUR TESTER DES CHOSES */
        public afficheDifficile(req: Request, res: Response, next: NextFunction): void {
            res.send(JSON.stringify("DIFFICILE"));
        }

        //Interface pour tests...
        public initCasesNoires(ratioVoulu: number): number {
            this.initMatrice();
            return this.genererCasesNoires(ratioVoulu);
        }

        public initListeMot(): void {

            this.genererListeMot();
        }

        public genererMot(x: number, y: number, estVertical: boolean): Mockword {

            let longMot: number = 0;
            for (let i: number = estVertical ? y: x; i < this.tailleGrille; i++) {
                if (this.grille[i][x] != NOIR || this.grille[y][i] != NOIR) {
                    longMot++;
                }
                else {
                    break;
                }
            }
            return new Mockword(estVertical, longMot, x, y);
        }

        private genererListeMot():number {

            for (let i: number = 0; i < this.tailleGrille; i++) {
                for (let j: number = 0; j < this.tailleGrille; j++) {
                    if (this.grille[i][j] == VIDE) {
                        if (j == 0) {
                            this.listeMot.push(this.genererMot(j, i, false));
                        }
                        else if (this.grille[i][j - 1] == NOIR) {   //Car je ne veux pas acceder a un espace memoire a [-1]
                             this.listeMot.push(this.genererMot(j, i, false));
                        }
                        if (i == 0) {
                            this.listeMot.push(this.genererMot(j, i, true));
                        }
                        else if (this.grille[i - 1][j] == NOIR) {   //Car je ne veux pas acceder a un espace memoire a [-1]
                            this.listeMot.push(this.genererMot(j, i, true));
                        }
                    }
                }
            }


            return 0;

        }

    }
}

export = Route