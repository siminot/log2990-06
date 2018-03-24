import { IntersectionPiste } from "./intersectionPiste";
import { DroiteAffichage } from "./droiteAffichage";
import { Point } from "../../elementsGeometrie/point";

describe("PointAffichage", () => {

    const X1: number = 5;
    const Y1: number = -10;
    const POINT1: Point = new Point(X1, Y1);

    const X2: number = 7;
    const Y2: number = 3;
    const POINT2: Point = new Point(X2, Y2);

    const DROITE: DroiteAffichage = new DroiteAffichage(POINT1, POINT1);
    let intersection: IntersectionPiste;
    let intersection2: IntersectionPiste;

    beforeEach(() => {
        intersection = new IntersectionPiste(DROITE, POINT1);
    });

    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            expect(intersection).toBeTruthy();
            expect(intersection.point).toEqual(POINT1);
            expect(intersection.droiteArrivee.droite.end).toEqual(POINT1.vecteurPlanXZ);
            expect(intersection.droiteDebut.droite.start).toEqual(POINT1.vecteurPlanXZ);

            const NOMBRE_ENFANTS: number = 3;
            expect(intersection.children.length).toEqual(NOMBRE_ENFANTS);
        });
    });

    describe("Methodes: ", () => {

        beforeEach(() => {
            intersection2 = new IntersectionPiste(intersection.droiteArrivee, POINT2);
        });

        it("le point a l'extremite est bien detecte", () => {
            expect(intersection["estPointDuBout"]).toBeTruthy();
        });

        it("le premier point place est bien detecte", () => {
            expect(intersection["estPremierPointPlace"]).toBeTruthy();
            intersection2 = new IntersectionPiste(intersection.droiteArrivee, POINT2);
            expect(intersection2["estPremierPointPlace"]).not.toBeTruthy();
        });

        it("la mise a jour du point est correcte", () => {
            intersection.point = POINT2;
            expect(intersection.point).toEqual(POINT2);
            expect(intersection.droiteArrivee.droite.end).toEqual(POINT2.vecteurPlanXZ);
            expect(intersection.droiteDebut.droite.start).toEqual(POINT2.vecteurPlanXZ);
        });

        it("la droite de depart se ramene correctement", () => {
            const ancienneDroite: DroiteAffichage = intersection.droiteDebut;
            intersection.ramenerDroiteDepart();
            expect(intersection.droiteDebut).not.toEqual(ancienneDroite);
            expect(intersection.droiteDebut.arrivee.equals(intersection.point));
        });

        it("la liaison de deux intersections se fait", () => {
            expect(intersection.droiteDebut).not.toEqual(intersection2.droiteArrivee);
            intersection.bouclerAvec(intersection2);
            expect(intersection.droiteDebut).toEqual(intersection2.droiteArrivee);
        });

        it("la separation de deux intersections se fait", () => {
            intersection.bouclerAvec(intersection2);
            expect(intersection.droiteDebut).toEqual(intersection2.droiteArrivee);
            intersection.separer(intersection2);
            expect(intersection.droiteDebut).not.toEqual(intersection2.droiteArrivee);
        });
    });
});
