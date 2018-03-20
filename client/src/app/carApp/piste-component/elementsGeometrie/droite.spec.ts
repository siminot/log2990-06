import { Droite } from "./Droite";
import { Point } from "./Point";
import { Vector3 } from "three";
import * as assert from "assert";

// tslint:disable: no-magic-numbers
describe("test de Droite: ", () => {

    const droite: Droite = new Droite(new Point(6, 0), new Point(0, 5));
    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            expect(droite).toBeTruthy();
        });
    });
    describe("plusPetitX: ", () => {
        it("retourne bien le plus petit x", () => {
            expect(droite.plusPetitX).toEqual(0);
        });
    });
    describe("plusGrandX: ", () => {
        it("retourne bien le plus grand x", () => {
            expect(droite.plusGrandX).toEqual(6);
        });
    });
    describe("plusPetitY: ", () => {
        it("retourne bien le plus petit y", () => {
            expect(droite.plusPetitY).toEqual(0);
        });
    });
    describe("plusGrandY: ", () => {
        it("retourne bien le plus grand y", () => {
            expect(droite.plusGrandY).toEqual(5);
        });
    });
    describe("modifierDepart: ", () => {
        it("le depart devrait etre modifie", () => {
            const departInitial: Vector3 = droite.start;
            droite.modifierDepart(new Point(5, 1));
            assert(!departInitial.equals(droite.start));
        });
    });
    describe("modifierArrivee: ", () => {
        it("l'arrivee devrait etre modifiee", () => {
            const arriveetInitiale: Vector3 = droite.end;
            droite.modifierArrivee(new Point(1, 6));
            assert(!arriveetInitiale.equals(droite.end));
        });
    });
    describe("direction: ", () => {
        it("la direction est la bonne", () => {
            assert(droite.direction.equals(new Vector3(1 - 5, 0, 6 - 1)));
        });
    });

    describe("angleAvecDroite: ", () => {
        it("bon angle calcule", () => {
            const droite1: Droite = new Droite(new Point(0, 0), new Point(1, 0));
            const droite2: Droite = new Droite(new Point(0, 0), new Point(0, 1));
            expect(droite1.angleAvecDroite(droite2)).toEqual(Math.PI / 2);
        });
    });
    describe("boite: ", () => {
        it("bonne boite", () => {
            expect(droite.boite).toEqual(new Droite(new Point(1, 1), new Point(5, 6)));
        });
    });
    describe("pointFinalDroiteCentree: ", () => {
        it("", () => {
            expect(droite.pointFinalDroiteCentree).toEqual(new Point(-4, 5));
        });
    });
});
