import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "../types";
import { GenerateurGrille } from "./generateurGrille";

@injectable()
export class RouteGenGrille {

    public readonly mainRoute: string = "/grille";

    public constructor(@inject(Types.GenerateurGrille) private genGrille: GenerateurGrille) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => this.genGrille.afficheGrille(req, res, next));

        router.get("/facile",
                   (req: Request, res: Response, next: NextFunction) => this.genGrille.afficheDifficile(req, res, next));

        router.get("/normal",
                   (req: Request, res: Response, next: NextFunction) => this.genGrille.afficheDifficile(req, res, next));

        router.get("/difficile",
                   (req: Request, res: Response, next: NextFunction) => this.genGrille.afficheDifficile(req, res, next));

        return router;
    }
}
