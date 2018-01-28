import { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import { injectable, } from "inversify";

module Route {

    @injectable()
    export class GenerateurGrille {

        grille: string[][];
        nbCarreNoirs: number;
        listeMots: string[];

        public generateurGrille(req: Request, res: Response, next: NextFunction): void {
            res.send();
        }

        creationTableau(): void {


        }

        generationCasesNoires(pourcentageCasesNoires: number ): void {

        }


    }
}

export = Route;