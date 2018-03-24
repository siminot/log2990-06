import { injectable } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import { ServiceWeb } from "../serviceweb";

@injectable()
export class RouteBaseDonneesCourse extends ServiceWeb {

    public readonly mainRoute: string = "/mean";

    public constructor() {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            res.send("Hello from DB!");
        });

        return router;
    }
}
