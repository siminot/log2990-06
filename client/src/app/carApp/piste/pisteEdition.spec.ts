import { PisteEdition } from "./pisteEdition";
import { PISTE_TEST } from "./pisteTest";
import { Point } from "../elementsGeometrie/point";

let piste: PisteEdition;

describe("PisteEdition", () => {

    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            piste = new PisteEdition();
            expect(piste).toBeTruthy();
        });
    });

    describe("Ajout de points", () => {
        it("Ajout d'une liste de points", () => {
            for (const point of PISTE_TEST) {
                piste.ajouterPoint(point);
            }

            expect(piste["intersections"].length).toEqual(PISTE_TEST.length);
        });

        it("Boucler le circuit fonctionne", () => {
            expect(piste["estBoucle"]).toBeFalsy();
            piste.ajouterPoint(PISTE_TEST[0]);
            expect(piste["estBoucle"]).toBeTruthy();
        });

        it("Exporter piste", () => {
            const points: Point[] = piste.exporter();
            expect(points.length).toEqual(PISTE_TEST.length);
            for (let i: number = 0 ; i < points.length ; i++) {
                expect(points[i].equals(PISTE_TEST[i])).toBeTruthy();
            }
        });

        it("Verification du sens : est anti-horaire", () => {
            expect(piste.estSensHoraire()).toBeFalsy();
        });

        it("Verification du sens : est horaire", () => {
            const pisteTest: PisteEdition = new PisteEdition();

            for (const point of PISTE_TEST.reverse()) {
                pisteTest.ajouterPoint(point);
            }
            expect(pisteTest.estSensHoraire()).toEqual(null);
            pisteTest.ajouterPoint(PISTE_TEST[0]);
            expect(pisteTest["estBoucle"]).toBeTruthy();
            expect(pisteTest.estSensHoraire()).toBeTruthy();
        });
    });

    describe("Selection d'une intersection", () => {

        it("Selectionner une intersection", () => {
            expect(piste["intersectionSelectionnee"]).toEqual(null);
            piste.selectionnerIntersection(PISTE_TEST[0]);
            expect(piste["intersectionSelectionnee"].point.equals(PISTE_TEST[0])).toBeTruthy();
        });

        it("Deselectionner une intersection", () => {
            expect(piste["intersectionSelectionnee"]).not.toEqual(null);
            piste.deselectionnerIntersection();
            expect(piste["intersectionSelectionnee"]).toEqual(null);
        });
    });

    describe("Importation", () => {
        it("Importer une piste non vide fonctionne", () => {
            piste.importer(PISTE_TEST);
            expect(piste["intersections"].length).toEqual(PISTE_TEST.length);
            expect(piste["estBoucle"]).toBeTruthy();
        });

        it("Importer une piste vide fonctionne", () => {
            piste.importer([]);
            expect(piste["intersections"].length).toEqual(0);
        });
    });
});
