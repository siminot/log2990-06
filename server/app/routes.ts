import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "./types";
import { ServiceLexical } from "./crosswords/serviceLexical/ServiceLexical";

@injectable()
export class Routes {

    public constructor(@inject(Types.ServiceLexical) private serviceLexical: ServiceLexical) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/serviceLexical",
                   (req: Request, res: Response, next: NextFunction) => this.serviceLexical.servirMots(req, res, next));

        return router;
    }
}
