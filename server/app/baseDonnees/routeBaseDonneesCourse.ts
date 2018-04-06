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

        router.get("/", async (req: Request, res: Response, next: NextFunction) => {
           await this.baseDonneesCourse.requeteDePistes(req, res, next);
        });

        router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
            await this.baseDonneesCourse.requeteUnePiste(req, res, next);
        });

        router.post("/ajouter", async (req: Request, res: Response, next: NextFunction) => {
            await this.baseDonneesCourse.requeteAjoutDUnePiste(req, res, next);
        });

        router.patch("/modifier/:id", async (req: Request, res: Response, next: NextFunction) => {
            await this.baseDonneesCourse.requeteModifierPiste(req, res, next);
        });

        router.delete("/supprimer/:id", async (req: Request, res: Response, next: NextFunction) => {
            await this.baseDonneesCourse.requeteSupprimerPiste(req, res, next);
        });

        return router;
    }
}
