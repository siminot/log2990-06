import { SegmentPiste } from "./segmentPiste";
import { Point } from "../../elementsGeometrie/point";

// tslint:disable: no-magic-numbers
describe("SegmentPiste", () => {

    const POINT1: Point = new Point(0, 0);
    const POINT2: Point = new Point(4, -2);
    const segment: SegmentPiste = new SegmentPiste(POINT1, POINT2);
    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            expect(segment).toBeTruthy();
        });

        it("la position est bien initialisee", () => {
            expect(segment.position).toEqual(POINT1.vecteurPlanXZ);
        });

        it("le segment contient le bon nombre d'elements (cercle + plan)", () => {
            const NOMBRE_ELEMENTS: number = 2;
            expect(segment.children.length).toEqual(NOMBRE_ELEMENTS);
        });
    });
});
