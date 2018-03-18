import { ContrainteCroisementDroite } from "./containteCroisementDroite";
import { Droite } from "./Droite";
import { Point } from "./Point";
import * as assert from "assert";

// tslint:disable: no-magic-numbers
describe("Contrainte croisement droite: ", () => {
    describe("droites ne se croisant pas: ", () => {
        it("deux droites paralleles(1): ", () => {
            const droiteA: Droite = new Droite(new Point(0, 0), new Point(2, 0));
            const droiteB: Droite = new Droite(new Point(0, 1), new Point(2, 1));

            assert(!ContrainteCroisementDroite.droitesSeCroisent(droiteA, droiteB));
        });

        it("deux droites paralleles(2): ", () => {
            const droiteA: Droite = new Droite(new Point(0, 0), new Point(1, 0));
            const droiteB: Droite = new Droite(new Point(2, 0), new Point(3, 0));

            assert(!ContrainteCroisementDroite.droitesSeCroisent(droiteA, droiteB));
        });

        it("deux droites de direction differentes(1): ", () => {
            const droiteA: Droite = new Droite(new Point(2, 2), new Point(0, 1));
            const droiteB: Droite = new Droite(new Point(2, 0), new Point(0, 0));

            assert(!ContrainteCroisementDroite.droitesSeCroisent(droiteA, droiteB));
        });

        it("deux droites de direction differentes(2): ", () => {
            const droiteA: Droite = new Droite(new Point(1, 4), new Point(4, 0));
            const droiteB: Droite = new Droite(new Point(0, 0), new Point(2, 2));

            assert(!ContrainteCroisementDroite.droitesSeCroisent(droiteA, droiteB));
        });

        it("deux droites de direction differentes avec points negatifs: ", () => {
            const droiteA: Droite = new Droite(new Point(-5, 0), new Point(5, -2));
            const droiteB: Droite = new Droite(new Point(4, 3), new Point(4, -1));

            assert(!ContrainteCroisementDroite.droitesSeCroisent(droiteA, droiteB));
        });
    });
    describe("droites qui se croisent: ", () => {
        it("deux droites identiques: ", () => {
            const droiteA: Droite = new Droite(new Point(0, 0), new Point(2, 0));
            const droiteB: Droite = new Droite(new Point(0, 0), new Point(2, 0));

            assert(ContrainteCroisementDroite.droitesSeCroisent(droiteA, droiteB));
        });

        it("deux droites collineaires sur certains points: ", () => {
            const droiteA: Droite = new Droite(new Point(0, 0), new Point(2, 2));
            const droiteB: Droite = new Droite(new Point(1, 1), new Point(3, 3));

            assert(ContrainteCroisementDroite.droitesSeCroisent(droiteA, droiteB));
        });

        it("deux droites se croisent en leur centre: ", () => {
            const droiteA: Droite = new Droite(new Point(0, 0), new Point(1, 1));
            const droiteB: Droite = new Droite(new Point(0, 1), new Point(1, 0));

            assert(ContrainteCroisementDroite.droitesSeCroisent(droiteA, droiteB));
        });

        it("deux droites perpendiculaires se touchant a l'origine: ", () => {
            const droiteA: Droite = new Droite(new Point(0, 0), new Point(1, 0));
            const droiteB: Droite = new Droite(new Point(0, 0), new Point(0, 1));

            assert(ContrainteCroisementDroite.droitesSeCroisent(droiteA, droiteB));
        });
    });
});
