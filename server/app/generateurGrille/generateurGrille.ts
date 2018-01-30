import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import { TAILLE_TEST } from "./constantes";

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;
        private tailleGrille: number = TAILLE_TEST;

        constructor() {

            this.initMatrice();

        }

        private initMatrice(): void {

            this.grille = new Array(this.tailleGrille).fill("0");
            for (let i: number = 0; i < this.tailleGrille; i++) {
                this.grille[i] = new Array(this.tailleGrille).fill("0");
            }

        }

        private genererCasesNoires(ratioVoulu: number): number {
            
            if (ratioVoulu < 0 || ratioVoulu > 1)
            return null;

            let nombreCases: number = Math.ceil(this.tailleGrille * this.tailleGrille * ratioVoulu);
            let compteurCasesNoires: number = 0;
            let x: number = 0;
            let y: number = 0;

            while(compteurCasesNoires < nombreCases) {

                x = Math.floor(Math.random() * this.tailleGrille);
                y = Math.floor(Math.random() * this.tailleGrille);

                if (Math.random() <= ratioVoulu) {

                    //Verif si position est valide pour insertion
                    if (this.verifInsertCaseNoire(x, y)) {
                        this.grille[y][x] = "-1";
                        compteurCasesNoires++;
                    }
                }
            }
            return nombreCases;
        }

        private verifInsertCaseNoire(positionX: number, positionY: number): Boolean {

            if (this.grille[positionY][positionX] == "-1")
                return false;

            this.grille[positionY][positionX] = "-1";

            let caseDisponible: Boolean = true;

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

        private neGenerePasDeTrou(positionX: number, positionY: number): Boolean {

            if (positionX < 0 || positionY <0 || positionX >= this.tailleGrille || positionY >= this.tailleGrille )
                return true;
            if(this.grille[positionY][positionX] == "-1")
                return true;
                
            if (positionY - 1 > 0)
                if(this.grille[positionY - 1][positionY] == "0")
                    return true;
            if (positionY + 1 < this.tailleGrille)
                if(this.grille[positionY + 1][positionX] == "0")
                    return true;
            if (positionX - 1 > 0)
                if(this.grille[positionY][positionX - 1] == "0")
                    return true;
            if (positionX + 1 < this.tailleGrille)
                if(this.grille[positionY][positionX + 1] == "0")
                    return true;

            return false;
        }

        public afficheGrille(req: Request, res: Response, next: NextFunction): void {
            this.initCasesNoires(.25);
            res.send(JSON.stringify(this.grille));
        }

        public afficheDifficile(req: Request, res: Response, next: NextFunction): void {

            res.send(JSON.stringify("DIFFICILE"));
        }

        //Interface pour tests...
        public initCasesNoires(ratioVoulu: number): number {
            this.initMatrice();
            return this.genererCasesNoires(ratioVoulu);
        }

    }
}

export = Route