import { Injectable, Inject } from "@angular/core";
import { MeshBasicMaterial, Mesh, CircleGeometry, Group } from "three";
import { PI_OVER_2 } from "../constants";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { EvenementSouris, TypeEvenementSouris } from "../souris/evenementSouris";
import { GestionnaireCameraPiste } from "./gestionnaireCameraPiste";
import { TransformateurCoordonnees } from "./elementsGeometrie/TransformateurCoordonnees";
import { Point } from "./elementsGeometrie/Point";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";

const RAYON_POINT: number = 0.5;
const NOMBRE_SEGMENTS: number = 25;
const COULEUR_POINT: number = 0xFFFF00;

@Injectable()
export class GestionnairePiste {

    private _piste: Group;
    private souris: UtilisateurPeripherique;
    private transformateur: TransformateurCoordonnees;
    private pointCourant: Mesh;

    public get piste(): Group {
        return this._piste;
    }

    public constructor(@Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris,
                       @Inject(GestionnaireCameraPiste) gestionnaireCamera: GestionnaireCameraPiste,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran) {
        this._piste = new Group();
        this.souris = new UtilisateurPeripherique(gestionnaireSouris);
        this.transformateur = new TransformateurCoordonnees(gestionnaireCamera, gestionnaireEcran);
        this.inscriptionSouris();
    }

    private creerPoint(): void {
        this.pointCourant = new Mesh(new CircleGeometry(RAYON_POINT, NOMBRE_SEGMENTS), new MeshBasicMaterial( {color: COULEUR_POINT}));
        this.pointCourant.position.set(0, -1, 0);
        this.pointCourant.rotateX(PI_OVER_2);
        this._piste.add(this.pointCourant);
    }

    private miseAJourPoint(evenementSouris: MouseEvent): void {
        if (this.pointCourant === undefined) {
            this.creerPoint();
        }

        const souris: Point = this.transformateur.positionEcranVersScene(evenementSouris);
        this.pointCourant.position.set(souris.x, 1, souris.y);
    }

    private fixerPointCourant(evenementSouris: MouseEvent): void {
        this.creerPoint();
    }

    private inscriptionSouris(): void {
        this.souris.ajouter(this.miseAJourPoint.bind(this), new EvenementSouris(TypeEvenementSouris.DRAG));
        this.souris.ajouter(this.fixerPointCourant.bind(this), new EvenementSouris(TypeEvenementSouris.CLICK));
    }
}
