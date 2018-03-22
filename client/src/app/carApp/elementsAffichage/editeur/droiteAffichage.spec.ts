import { DroiteAffichage, COULEUR_CORRECTE, COULEUR_DEFAUT, COULEUR_ERREUR } from "./droiteAffichage";
import { Point } from "../../elementsGeometrie/point";
import { LineBasicMaterial, Geometry } from "three";

describe("PointAffichage", () => {

    const X: number = 5;
    const Y: number = -10;
    const POINT: Point = new Point(X, Y);
    const POINT_INVERSE: Point = new Point(Y, X);
    const NOUVEAU_POINT: Point = new Point(Y, Y);
    let droiteAffichage: DroiteAffichage;

    beforeEach(() => {
        droiteAffichage = new DroiteAffichage(POINT, POINT_INVERSE);
    });

    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            expect(droiteAffichage).toBeTruthy();
            expect(droiteAffichage.droite.start).toEqual(POINT.vecteurPlanXZ);
            expect(droiteAffichage.droite.end).toEqual(POINT_INVERSE.vecteurPlanXZ);

            droiteAffichage.material instanceof LineBasicMaterial
                ? expect(droiteAffichage.material.color.getHex()).toEqual(COULEUR_DEFAUT)
                : expect(false).toBeTruthy();
        });

        it("la droite est de la bonne couleur quand elle respecte les contraintes", () => {
            droiteAffichage.respecteContraintes();

            droiteAffichage.material instanceof LineBasicMaterial
            ? expect(droiteAffichage.material.color.getHex()).toEqual(COULEUR_CORRECTE)
            : expect(false).toBeTruthy();
        });

        it("la droite est de la bonne couleur quand elle brise une contrainte", () => {
            droiteAffichage.briseContrainte();

            droiteAffichage.material instanceof LineBasicMaterial
            ? expect(droiteAffichage.material.color.getHex()).toEqual(COULEUR_ERREUR)
            : expect(false).toBeTruthy();
        });

        it("la modification du point de depart se fait", () => {
            expect(droiteAffichage.droite.start).not.toEqual(NOUVEAU_POINT.vecteurPlanXZ);
            droiteAffichage.miseAJourDepart(NOUVEAU_POINT);
            expect(droiteAffichage.droite.start).toEqual(NOUVEAU_POINT.vecteurPlanXZ);

            droiteAffichage.geometry instanceof Geometry
                ? expect(droiteAffichage.geometry.vertices[0]).toEqual(NOUVEAU_POINT.vecteurPlanXZ)
                : expect(false).toBeTruthy();
        });

        it("la modification du point d'arrivee se fait", () => {
            expect(droiteAffichage.droite.end).not.toEqual(NOUVEAU_POINT.vecteurPlanXZ);
            droiteAffichage.miseAJourArrivee(NOUVEAU_POINT);
            expect(droiteAffichage.droite.end).toEqual(NOUVEAU_POINT.vecteurPlanXZ);

            droiteAffichage.geometry instanceof Geometry
                ? expect(droiteAffichage.geometry.vertices[1]).toEqual(NOUVEAU_POINT.vecteurPlanXZ)
                : expect(false).toBeTruthy();
        });

        it("la modification du point se fait", () => {
            expect(droiteAffichage.droite.start).not.toEqual(NOUVEAU_POINT.vecteurPlanXZ);
            expect(droiteAffichage.droite.end).not.toEqual(NOUVEAU_POINT.vecteurPlanXZ);
            droiteAffichage.miseAJourPoint(NOUVEAU_POINT);
            expect(droiteAffichage.droite.start).toEqual(NOUVEAU_POINT.vecteurPlanXZ);
            expect(droiteAffichage.droite.end).toEqual(NOUVEAU_POINT.vecteurPlanXZ);

            droiteAffichage.geometry instanceof Geometry
                ? expect(droiteAffichage.geometry.vertices).toEqual([NOUVEAU_POINT.vecteurPlanXZ, NOUVEAU_POINT.vecteurPlanXZ])
                : expect(false).toBeTruthy();
        });
    });
});
