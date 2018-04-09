import { Injectable } from "@angular/core";
import { Mesh , Vector3, Scene, SphereGeometry, MeshBasicMaterial } from "three";

import { Voiture } from "../voiture/voiture";

// const LONGEUR_AUTO: number = 1.7000000476837158;
const LARGEUR_AUTO: number = 0.8;
// const HAUTEUR_AUTO: number = 0.550000011920929;
@Injectable()
export class GestionnaireCollision {

    private position: Vector3;
    private direction: Vector3;

    private sphere: Mesh;

    // private longueurVoiture: number;
    public constructor() {

    }

    public creationShpere(): Mesh {
        let geometry: SphereGeometry = new SphereGeometry(LARGEUR_AUTO, 32, 32 );
        let material: MeshBasicMaterial = new MeshBasicMaterial( {color: 0xffff00} );

        return new Mesh( geometry, material );
    }

    public miseAjour(voiture: Voiture): void {
        this.direction = voiture.getDirection().clone();
        this.position = voiture.position.clone();
        const tempo: Vector3 = new Vector3(1.18,1.18,1.18);
        this.direction = this.direction.multiply(tempo);
        this.position.add(this.direction);
        this.sphere.position.set(this.position.x, this.position.y, this.position.z);
    }

    public genererSphere(scene: Scene): void {
            this.sphere = this.creationShpere();
            scene.add(this.sphere);
        }

    }