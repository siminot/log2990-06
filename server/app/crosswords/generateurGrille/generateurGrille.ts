import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";
import { TAILLE_TEST } from "./constantes";

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: Array<Array<string>>;

        constructor() {

            this.grille = new Array(TAILLE_TEST).fill("0");
            for (let i: number = 0; i < TAILLE_TEST; i++) {
                this.grille[i] = new Array(TAILLE_TEST).fill("0");
            }

        }

        private genererCasesNoires(ratioVoulu: number): number {
            
            if (ratioVoulu < 0 || ratioVoulu > 1)
            return null;

            let nombreCases: number = Math.ceil(TAILLE_TEST * TAILLE_TEST * ratioVoulu);
            let compteurCasesNoires: number = 0;
            let x: number = 0;
            let y: number = 0;

            while(compteurCasesNoires < nombreCases) {

                x = Math.floor(Math.random() * TAILLE_TEST);
                y = Math.floor(Math.random() * TAILLE_TEST);

                if (Math.random() <= ratioVoulu) {

                    //Verif si position est valide pour insertion
                    if (this.verifInsertCaseNoire(x, y))
                    this.grille[y][x] = "-1";
                    compteurCasesNoires++;
                }
            }
            return nombreCases;
        }

        private verifInsertCaseNoire(positionX: number, positionY: number): Boolean {

             //parcours colonne
            for (let i: number = 0; i < TAILLE_TEST; i++) {
            }

            //Parcours rangee
            for (let i: number = 0; i < TAILLE_TEST; i++) {
            }

            return true;
        }

        public generateurGrille(req: Request, res: Response, next: NextFunction): void {
            res.send();
        }


        //Interface pour tests...
        public initCasesNoires(ratioVoulu: number): number {
            return this.genererCasesNoires(ratioVoulu);
        }

    }
}

export = Route