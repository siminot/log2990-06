import { Point } from "../elementsGeometrie/point";

// tslint:disable: no-magic-numbers
describe("Point", () => {

    const X: number = 5;
    const Y: number = -10;
    const point: Point = new Point(X, Y);
    const pointInverse: Point = new Point(Y, X);
    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            expect(point).toBeTruthy();
            expect(point.x).toEqual(X);
            expect(point.y).toEqual(Y);
        });

        it("le vecteur XY est correct", () => {
            expect(point.vecteurPlanXZ.x).toEqual(X);
            expect(point.vecteurPlanXZ.y).toEqual(0);
            expect(point.vecteurPlanXZ.z).toEqual(Y);
        });

        it("le vecteur XY est correct", () => {
            expect(point.vecteurPlanXZ.x).toEqual(X);
            expect(point.vecteurPlanXZ.y).toEqual(0);
            expect(point.vecteurPlanXZ.z).toEqual(Y);
        });

        it("L'egalite est detectee entre 2 points", () => {
            expect(point.estEgalA(pointInverse)).not.toBeTruthy();
            expect(point.estEgalA(new Point(X, Y))).toBeTruthy();
            expect(point.estEgalA(point)).toBeTruthy();
        });
    });
});
