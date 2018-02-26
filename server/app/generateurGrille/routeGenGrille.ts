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

        router.get("/:difficulte",
                   async (req: Request, res: Response, next: NextFunction) => this.genGrille.requeteDeGrille(req, res, next));

        return router;
    }
}
