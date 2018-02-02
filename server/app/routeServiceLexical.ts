import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "./types";
import { ServiceLexical } from "./crosswords/serviceLexical/ServiceLexical";
import { Frequence } from "./crosswords/serviceLexical/Mot";

@injectable()
export class RouteServiceLexical {

    public constructor(@inject(Types.ServiceLexical) private serviceLexical: ServiceLexical) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/serviceLexical/liste/:contrainte",
            (req: Request, res: Response, next: NextFunction) => {
                this.serviceLexical.servirMots(req.params.contrainte)
                    .then(reponse => res.send(reponse));
            })

        router.get("/serviceLexical/liste/commun/:contrainte",
            (req: Request, res: Response, next: NextFunction) => {
                this.serviceLexical.servirMotsSelonFrequence(req.params.contrainte, Frequence.Commun, res)
            })

        router.get("/serviceLexical/liste/noncommun/:contrainte",
            (req: Request, res: Response, next: NextFunction) => {
                this.serviceLexical.servirMotsSelonFrequence(req.params.contrainte, Frequence.NonCommun, res)
            })

        router.get("/serviceLexical/def/:mot",
            (req: Request, res: Response, next: NextFunction) => {
                this.serviceLexical.obtenirDefinitionsMot(req.params.mot, res);
            })
        
        return router;
    }
}
