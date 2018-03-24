import { Mongoose, Model, Connection, Schema, Document } from "mongoose";
import { RouteBaseDonneesCourse } from "./routeBaseDonneesCourse";
import { Point } from "../../../client/src/app/carApp/elementsGeometrie/point";
import { PisteBD } from "../../../client/src/app/carApp/piste/pisteBD";
import { InterfacePointBaseDonnees } from "./interfacePointBD";
import { ErreurRechercheBaseDonnees } from "./../../../client/src/app/exceptions/erreurRechercheBD";
import { Request, Response, NextFunction } from "express";

const URL_BD: string = "mongodb://admin:admin@ds123129.mlab.com:23129/log2990";

export class BaseDonneesCourse {

    private mongoose: Mongoose;
    private schemaPiste: Schema;
    private modelPiste: Model<Document>;

    constructor() {
        this.mongoose = new Mongoose();
        this.schemaPiste = new Schema({
            nom: String,
            description: String,
            points: [{ x: Number, y: Number }],
        });
        this.modelPiste = this.mongoose.model("pistes", this.schemaPiste);
    }

    public async seConnecter(): Promise<void> {
        this.mongoose.connect(URL_BD)
        .then(() => {
            console.log("connecte a la base de donnee");
        }).catch(() => {
            console.log("erreur de connection");
        });
    }

    public get connection(): number {
        return this.mongoose.connection.readyState;
    }

    public chargerModelPiste(): void {
        this.mongoose.connection.model("pistes");
    }

    public async ajouterPisteBidon(): Promise<void> {
        const longueur: number = 100;
        const piste: Document =  new this.modelPiste ({
            nom: "Piste 1",
            description: "Parc au centre de la ville",
            points: [   {x: -longueur, y: -longueur},
                        {x: longueur, y: -longueur},
                        {x: longueur, y: longueur},
                        {x: -longueur , y: longueur}    ]
        });
        await this.modelPiste.create(piste);
    }

    public async obtenirPistes(): Promise<PisteBD[]> {
        const pistes: PisteBD[] = [];
        await this.modelPiste.find((err: ErreurRechercheBaseDonnees, res: Document[]) => {
            for (const document of res) {
                pistes.push(document.toObject());
            }
        });

        return pistes;
    }

    public async requeteDePistes(req: Request, res: Response, next: NextFunction): Promise<void> {
        if (this.connection !== 1) {
            await this.seConnecter();
        }
        this.chargerModelPiste();
        const pistes: PisteBD[] = await this.obtenirPistes();
        res.send(pistes);
    }
}
