import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "../../types";
import { ServiceLexical } from "./ServiceLexical";
import { Frequence } from "./Mot";
import { ServiceWeb } from "../../serviceweb";

@injectable()
export class RouteServiceLexical extends ServiceWeb {

    public readonly mainRoute: string = "/serviceLexical";

    public constructor(@inject(Types.ServiceLexical) private serviceLexical: ServiceLexical) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/liste/:contrainte",
            (req: Request, res: Response, next: NextFunction) => {
                this.serviceLexical.servirMots(req.params.contrainte)
                    .then(reponse => res.send(reponse));
            })

        router.get("/liste/commun/:contrainte",
            (req: Request, res: Response, next: NextFunction) => {
                this.serviceLexical.servirMotsSelonFrequence(req.params.contrainte, Frequence.Commun, res)
            })

        router.get("/liste/noncommun/:contrainte",
            (req: Request, res: Response, next: NextFunction) => {
                this.serviceLexical.servirMotsSelonFrequence(req.params.contrainte, Frequence.NonCommun, res)
            })

        router.get("/def/:mot",
            (req: Request, res: Response, next: NextFunction) => {
                this.serviceLexical.obtenirDefinitionsMot(req.params.mot, res);
            })
        
        return router;
    }
}
