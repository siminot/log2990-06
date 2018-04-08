import { Injectable } from "@angular/core";
import {  Object3D, Box3, Vector3 } from "three";


@Injectable()
export class GestionnaireCollision {

    private largeurVoiture: number;
    // private longueurVoiture: number;
    public constructor() {
        this.largeurVoiture = 2;

    }

    public mesureDimensionAuto( voiture: Object3D): void {
        const boitePourMesure: Box3 = new Box3().setFromObject(voiture);
        const dimension: Vector3 = boitePourMesure.getSize();
        console.log(dimension.x);
        console.log(dimension.y);
        console.log(dimension.z);

    }
}