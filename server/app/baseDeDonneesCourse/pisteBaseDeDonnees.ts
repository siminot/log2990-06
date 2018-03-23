import { Point } from "./../../../client/src/app/carApp/piste-component/elementsGeometrie/Point";
import { PisteBD } from "./../../../client/src/app/carApp/piste-component/pisteBD";
import { Document } from "mongoose";

export interface InterfaceModelPiste extends PisteBD, Document  {
}
