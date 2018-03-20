import * as mongoose from "mongoose";
import { Point } from "./../../../client/src/app/carApp/piste-component/elementsGeometrie/Point";

export interface InterfaceModelPiste extends mongoose.MongooseDocument {
    nom: string;
    description: string;
    points: Point[];

}
