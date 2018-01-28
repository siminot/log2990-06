import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "./types";
//import { Index } from "./routes/index";
import { GenerateurGrille } from "./crosswords/generateurGrille/generateurGrille"

@injectable()
export class Routes {

    public constructor(@inject(Types.GenerateurGrille) private test: GenerateurGrille) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => this.test.helloWorld(req, res, next));

        return router;
    }
}
