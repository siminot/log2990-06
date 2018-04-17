import { injectable, inject } from "inversify";
import { Router, Request, Response } from "express";

import { ServiceWeb } from "../serviceweb";
import Types from "../types";
import { BaseDonneesCourse } from "./baseDonneesCourse";

@injectable()
export class RouteBaseDonneesCourse extends ServiceWeb {

    public readonly mainRoute: string = "/apipistes";

    public constructor(@inject(Types.BaseDonneesCourse) private baseDonneesCourse: BaseDonneesCourse) {
        super();
    }

    public get routes(): Router {
        const router: Router = Router();

        router.get("/", async (req: Request, res: Response) => {
            await this.baseDonneesCourse.requeteDePistes(req, res);
        });

        router.get("/:id", async (req: Request, res: Response) => {
            await this.baseDonneesCourse.requeteUnePiste(req, res);
        });

        router.post("/ajouter", async (req: Request, res: Response) => {
            await this.baseDonneesCourse.requeteAjoutDUnePiste(req, res);
        });

        router.patch("/modifier/:id", async (req: Request, res: Response) => {
            await this.baseDonneesCourse.requeteModifierPiste(req, res);
        });

        router.patch("/incrementer/:id", async (req: Request, res: Response) => {
            await this.baseDonneesCourse.requeteIncrementerNbFoisJoue(req, res);
        });

        router.delete("/supprimer/:id", async (req: Request, res: Response) => {
            await this.baseDonneesCourse.requeteSupprimerPiste(req, res);
        });

        return router;
    }
}
