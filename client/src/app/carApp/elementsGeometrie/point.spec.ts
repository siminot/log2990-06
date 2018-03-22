import { Point } from "../elementsGeometrie/point";

describe("Point", () => {

    const X: number = 5;
    const Y: number = -10;
    const POINT: Point = new Point(X, Y);
    const POINT_INVERSE: Point = new Point(Y, X);
    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            expect(POINT).toBeTruthy();
            expect(POINT.x).toEqual(X);
            expect(POINT.y).toEqual(Y);
        });

        it("le vecteur XY est correct", () => {
            expect(POINT.vecteurPlanXZ.x).toEqual(X);
            expect(POINT.vecteurPlanXZ.y).toEqual(0);
            expect(POINT.vecteurPlanXZ.z).toEqual(Y);
        });

        it("le vecteur XY est correct", () => {
            expect(POINT.vecteurPlanXZ.x).toEqual(X);
            expect(POINT.vecteurPlanXZ.y).toEqual(0);
            expect(POINT.vecteurPlanXZ.z).toEqual(Y);
        });

        it("L'egalite est detectee entre 2 points", () => {
            expect(POINT.estEgalA(POINT_INVERSE)).not.toBeTruthy();
            expect(POINT.estEgalA(new Point(X, Y))).toBeTruthy();
            expect(POINT.estEgalA(POINT)).toBeTruthy();
        });
    });
});
