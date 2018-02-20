import { Phare } from "./phare";
import { Vector3 } from "three";

const COULEUR_ALLUMEE: number = 0xFFCC00;
const INTENSITE_DEFAUT: number = 3;
const DISTANCE: number = 30;
const PENOMBRE: number = 0.5;

// const POSITION: Vector3 = new Vector3(0, 0, 0);

const HAUTEUR: number = 0.5;
const LARGEUR: number = 0.5;
const PROFONDEUR: number = -1.65;
const AJUSTEMENT_FAISCEAU_DISTANCE_VOITURE: number = 0.75;

// const PHARE_GAUCHE_POSITION_RELATIVE: Vector3 = new Vector3(LARGEUR, HAUTEUR, PROFONDEUR);
const PHARE_POSITION_RELATIVE: Vector3 = new Vector3(LARGEUR, HAUTEUR, PROFONDEUR);
const PHARE_POSITION: Vector3 = new Vector3(LARGEUR, HAUTEUR, PROFONDEUR + AJUSTEMENT_FAISCEAU_DISTANCE_VOITURE);

describe("Phare", () => {
    let phare: Phare;

    it("Instantiable avec le constructeur", () => {
        phare = new Phare(PHARE_POSITION_RELATIVE);
        expect(phare).toBeDefined();
        expect(phare.distance).toBe(DISTANCE);
        expect(phare.penumbra).toBe(PENOMBRE);
        expect(phare.position).toEqual(PHARE_POSITION);
    });

    it("Phare s'eteint", () => {
        phare.eteindre();
        expect(phare.intensity).toBe(0);
    });

    it("Phare s'allume", () => {
        phare.allumer();
        expect(phare.color.getHex()).toBe(COULEUR_ALLUMEE);
        expect(phare.intensity).toBe(INTENSITE_DEFAUT);
    });
});
