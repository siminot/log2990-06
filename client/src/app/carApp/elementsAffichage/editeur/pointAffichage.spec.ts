import { PointAffichage, DIFFERENCE_PROFONDEUR } from "./pointAffichage";
import { Point } from "../../elementsGeometrie/point";

describe("PointAffichage", () => {

    const X: number = 5;
    const Y: number = -10;
    const POINT: Point = new Point(X, Y);
    const POINT_INVERSE: Point = new Point(Y, X);
    const pointAffichage: PointAffichage = new PointAffichage(POINT);

    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            expect(pointAffichage).toBeTruthy();
            expect(pointAffichage.point).toEqual(POINT);
            expect(pointAffichage.children.length).toBe(1);
        });

        it("la position de l'objet est correcte", () => {
            const POINT_RESTITUE: Point = new Point(pointAffichage.position.x, pointAffichage.position.z);
            expect(POINT_RESTITUE.equals(POINT)).toBeTruthy();
            expect(pointAffichage.position.y).toEqual(DIFFERENCE_PROFONDEUR);
        });

        it("l'ajout du contour se fait bien", () => {
            let nombreElements: number = pointAffichage.children.length;
            expect(nombreElements).toBe(1);
            pointAffichage.marquerCommePremier();
            expect(pointAffichage.children.length).toBe(++nombreElements);
            pointAffichage.marquerCommePremier();
            expect(pointAffichage.children.length).toBe(nombreElements);
        });

        it("la modification du point se fait", () => {
            const POINT_AVANT: Point = pointAffichage.point;
            pointAffichage.point = POINT_INVERSE;
            expect(pointAffichage.point).not.toEqual(POINT_AVANT);
            expect(pointAffichage.point).toEqual(POINT_INVERSE);
        });
    });
});
