import { Mongoose, Model, Connection, Schema } from "mongoose";
import { RouteBaseDonneesCourse } from "./routeBaseDonneesCourse";
import { Point } from "../../../client/src/app/carApp/elementsGeometrie/point";

export class BaseDonneesCourse {

    public readonly URL_BD: string = "mongodb://localhost:4200/baseDonnees";
    private routeBaseDonneesCourse: RouteBaseDonneesCourse = new RouteBaseDonneesCourse();
    private mongoose: Mongoose = new Mongoose();

    private schemaPiste: Schema = new Schema({
        nom: String,
        description: String,
        points: [Point]
    });

    private piste: Model = this.mongoose.model("piste", this.schemaPiste);

    public async seConnecter(): Promise<void> {
        this.mongoose.connect("mongodb://" + this.routeBaseDonneesCourse.mainRoute)
        .then(() => {
            console.log("connecte a la base de donnee");
        }).catch(() => {
            console.log("erreur de connection");
        });
    }

    public get connection(): number {
        return this.mongoose.connection.readyState;
    }




}


