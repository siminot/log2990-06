import { Point } from "./../../../client/src/app/carApp/elementsGeometrie/point";
import { PisteBD } from "./../../../client/src/app/carApp/piste/pisteBD";
import { Document } from "mongoose";

export interface InterfaceModelPiste extends PisteBD, Document  {
}
