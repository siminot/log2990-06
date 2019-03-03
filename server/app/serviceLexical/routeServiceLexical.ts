import { injectable } from "inversify";
import { Router, Request, Response } from "express";

import { ServiceLexical } from "./ServiceLexical";
import { Frequence } from "./Mot";
import { ServiceWeb, SERVER_HOSTNAME } from "../serviceweb";

@injectable()
export class RouteServiceLexical extends ServiceWeb {

    public readonly mainRoute: string = SERVER_HOSTNAME + "/serviceLexical";

    public constructor() {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/commun/contrainte/:contrainte", (req: Request, res: Response) => {
            ServiceLexical.servirMotsSelonContrainte(req.params.contrainte, Frequence.Commun, res);
        });

        router.get("/noncommun/contrainte/:contrainte", (req: Request, res: Response) => {
            ServiceLexical.servirMotsSelonContrainte(req.params.contrainte, Frequence.NonCommun, res);
        });

        return router;
    }
}
