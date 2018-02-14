import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "../types";
import { ServiceLexical } from "./ServiceLexical";
import { Frequence } from "./Mot";
import { ServiceWeb } from "../serviceweb";
// import { read } from "fs";

@injectable()
export class RouteServiceLexical extends ServiceWeb {

    public readonly mainRoute: string = "/serviceLexical";

    public constructor(@inject(Types.ServiceLexical) private serviceLexical: ServiceLexical) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/commun/contrainte/:contrainte", (req: Request, res: Response, next: NextFunction) => {
            this.serviceLexical.servirMotsSelonContrainte(req.params.contrainte, Frequence.Commun, res);
        });

        router.get("/noncommun/contrainte/:contrainte", (req: Request, res: Response, next: NextFunction) => {
            this.serviceLexical.servirMotsSelonContrainte(req.params.contrainte, Frequence.NonCommun, res);
        });

        // Routes pas utilisées... à effacer?

        /* router.get("/commun/longueur/:longueur", (req: Request, res: Response, next: NextFunction) => {
            this.serviceLexical.servirMotsSelonLongueur(req.params.longueur, Frequence.Commun, res);
        });

        router.get("/noncommun/longueur/:longueur", (req: Request, res: Response, next: NextFunction) => {
            this.serviceLexical.servirMotsSelonLongueur(req.params.longueur, Frequence.NonCommun, res);
        });

        router.get("/def/:mot", (req: Request, res: Response, next: NextFunction) => {
            this.serviceLexical.servirDefinitionsMot(req.params.mot, res);
        });
 */
        return router;
    }
}
