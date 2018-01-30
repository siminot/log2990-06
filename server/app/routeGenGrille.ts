import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "./types";
import { GenerateurGrille } from "./generateurGrille/generateurGrille";

@injectable()
export class RouteGenGrille {

    public constructor(@inject(Types.GenerateurGrille) private genGrille: GenerateurGrille) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => this.genGrille.afficheGrille(req, res, next));

        return router;
    }
}
