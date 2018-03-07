import { Injectable, Inject } from "@angular/core";
import { MeshBasicMaterial, Mesh, CircleGeometry, Group, Line, Geometry, LineBasicMaterial } from "three";
import { PI_OVER_2 } from "../constants";
import { UtilisateurPeripherique } from "../peripheriques/UtilisateurPeripherique";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { EvenementSouris, TypeEvenementSouris } from "../souris/evenementSouris";
import { GestionnaireCameraPiste } from "./gestionnaireCameraPiste";
import { TransformateurCoordonnees } from "./elementsGeometrie/TransformateurCoordonnees";
import { Point } from "./elementsGeometrie/point";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { Droite } from "./elementsGeometrie/droite";

const RAYON_POINT: number = 0.5;
const NOMBRE_SEGMENTS: number = 25;
const COULEUR_POINT: number = 0xFFFF00;
const COULEUR_DROITE: number = 0xFF00FF;

@Injectable()
export class GestionnairePiste {

    private _piste: Group;
    private souris: UtilisateurPeripherique;
    private transformateur: TransformateurCoordonnees;
    private pointCourant: Mesh;
    private pointEnCours: Point;
    private droites: Droite[];

    private points: Point[];

    public get piste(): Group {
        return this._piste;
    }

    public constructor(@Inject(GestionnaireSouris) gestionnaireSouris: GestionnaireSouris,
                       @Inject(GestionnaireCameraPiste) gestionnaireCamera: GestionnaireCameraPiste,
                       @Inject(GestionnaireEcran) gestionnaireEcran: GestionnaireEcran) {
        this._piste = new Group();
        this.points = [];
        this.droites = [];
        this.pointEnCours = null;
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

        this.pointEnCours = this.transformateur.positionEcranVersScene(evenementSouris);
        this.pointCourant.position.set(this.pointEnCours.x, 1, this.pointEnCours.y);
    }

    private fixerPointCourant(evenementSouris: MouseEvent): void {
        this.points.push(this.pointEnCours);

        const DEUX: number = 2;
        if (this.points.length >= DEUX) {
            this.ajouterDroite();
        }

        this.creerPoint();
    }

    private inscriptionSouris(): void {
        this.souris.ajouter(this.miseAJourPoint.bind(this), new EvenementSouris(TypeEvenementSouris.DRAG));
        this.souris.ajouter(this.fixerPointCourant.bind(this), new EvenementSouris(TypeEvenementSouris.CLICK));
    }

    private ajouterDroite(): void {
        const droite: Droite = new Droite(this.avantDernierPoint, this.dernierPoint);
        this.droites.push(droite);

        const geometrie: Geometry = new Geometry();
        geometrie.vertices.push(this.avantDernierPoint.vecteurPlanXZ, this.dernierPoint.vecteurPlanXZ);
        const materiel: LineBasicMaterial = new LineBasicMaterial({color: COULEUR_DROITE});
        this._piste.add(new Line(geometrie, materiel));
    }

    private get dernierPoint(): Point {
        return this.points[this.points.length - 1];
    }

    private get avantDernierPoint(): Point {
        return this.points[this.points.length - 1 - 1];
    }

}
