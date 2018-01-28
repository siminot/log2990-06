import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";

export const TAILLE_TABLEAU = 10;
export const DIX_POURCENT = 10;

module Route {

    @injectable()
    export class GenerateurGrille {

        private grille: string[][];
        private nbCarreNoirs: number;
        private listeMots: string[];

        public generateurGrille(req: Request, res: Response, next: NextFunction): void {
            res.send();
        }

        private creationTableau(): void {


        }

        private generationNombreCasesNoires(): number {
            return Math.floor(Math.random() * DIX_POURCENT) + DIX_POURCENT;
        }

        private generationCasesNoires(pourcentageCasesNoires: number ): void {

        }


    }
}

export = Route;
