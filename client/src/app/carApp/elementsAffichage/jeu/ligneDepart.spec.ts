import { LigneDeDepart } from "./ligneDepart";
import { Vector3 } from "three";
import { PI_OVER_2 } from "../../constants";

// tslint:disable: no-magic-numbers
describe("Ligne de depart", () => {

    const EMPLACEMENT: Vector3 = new Vector3(-1, 0, 1);
    const ANGLE: number = 0.75;
    const ligneDepart: LigneDeDepart = new LigneDeDepart(EMPLACEMENT, ANGLE);
    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            expect(ligneDepart).toBeTruthy();
        });

        it("la position est bien initialisee", () => {
            expect(ligneDepart.position).toEqual(EMPLACEMENT);
        });

        it("son angle de direction est perpendiculaire a l'angle de la piste", () => {
            expect(ANGLE).toBeLessThanOrEqual(Math.PI);
            expect(ligneDepart.rotation.y).toBeCloseTo(PI_OVER_2 - ANGLE);
        });
    });
});
