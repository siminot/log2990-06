import { Mongoose, Model, Connection, Schema, Document } from "mongoose";
import { RouteBaseDonneesCourse } from "./routeBaseDonneesCourse";
import { Point } from "../../../client/src/app/carApp/elementsGeometrie/point";
import { PisteBD } from "../../../client/src/app/carApp/piste/pisteBD";
import { InterfacePointBaseDonnees } from "./interfacePointBD";

const URL_BD: string = "mongodb://admin:admin@ds123129.mlab.com:23129/log2990";

export class BaseDonneesCourse {

    private mongoose: Mongoose;
    private schemaPiste: Schema;
    private pistes: Model<Document>;

    constructor() {
        this.mongoose = new Mongoose();
        this.schemaPiste = new Schema({
            nom: String,
            description: String,
            points: [{ x: Number, y: Number }],
        });
        this.pistes = this.mongoose.model("pistes", this.schemaPiste);
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
        const piste: Document =  new this.pistes ({
            nom: "Piste 1",
            description: "Parc au centre de la ville",
            points: [   {x: -longueur, y: -longueur},
                        {x: longueur, y: -longueur},
                        {x: longueur, y: longueur},
                        {x: -longueur , y: longueur}    ]
        });
        await this.pistes.create(piste);
    }
}
