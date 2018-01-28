import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import Types from "./types";
//import { Index } from "./routes/index";
import { ServiceLexical } from "./crosswords/serviceLexical/ServiceLexical";

@injectable()
export class Routes {

    public constructor(@inject(Types.Index) /*private index: Index, */private serviceLexical: ServiceLexical) {}

    public get routes(): Router {
        const router: Router = Router();

        router.get("/",
                   (req: Request, res: Response, next: NextFunction) => this.serviceLexical.messageServiceLexical(req, res, next));

        return router;
    }
}
