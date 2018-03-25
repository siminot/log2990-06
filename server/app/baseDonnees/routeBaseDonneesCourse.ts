import { injectable, inject } from "inversify";
import { Router, Request, Response, NextFunction } from "express";

import { ServiceWeb } from "../serviceweb";
import Types from "../types";
import { BaseDonneesCourse } from "./baseDonneesCourse";

@injectable()
export class RouteBaseDonneesCourse extends ServiceWeb {

    public readonly mainRoute: string = "/apipistes";

    public constructor(@inject(Types.BaseDonneesCourse) private baseDonneesCourse: BaseDonneesCourse ) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/", (req: Request, res: Response, next: NextFunction) => {
            this.baseDonneesCourse.requeteDePistes(req, res, next);
        });

        router.post("/ajoutBidon", async (res: Request, req: Response, next: NextFunction) => {
            await this.baseDonneesCourse.requeteAjoutDUnePiste(res, req, next);
        });

        return router;
    }
}
