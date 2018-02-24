import * as assert from "assert";
import { Skybox, TempsJournee, TAILLE_REPETITION, TAILLE_SKYBOX } from "./skybox";
import { SKYBOX, ConstructionSkybox } from "./gestionnaireSkybox";

const NBR_ELEMENTS_NUIT: number = 2;
const NBR_ELEMENTS_JOUR: number = NBR_ELEMENTS_NUIT + 1;

describe ("Skybox", () => {
    let skybox: Skybox;

    describe ("Construction", () => {
        it ("Une skybox de nuit est bien construite", () => {
            const liens: ConstructionSkybox = SKYBOX[0];
            skybox = new Skybox(TempsJournee.Nuit, liens.paysage, liens.plancher);
            expect(skybox).toBeDefined();
            expect(skybox.children.length).toEqual(NBR_ELEMENTS_NUIT);
        });

        it ("Une skybox de jour est bien construite", () => {
            const liens: ConstructionSkybox = SKYBOX[0];
            skybox = new Skybox(TempsJournee.Jour, liens.paysage, liens.plancher);
            expect(skybox).toBeDefined();
            expect(skybox.children.length).toEqual(NBR_ELEMENTS_JOUR);
        });

        it ("Taille skybox est une puissance de 2", () => {
            assert(Math.log2(TAILLE_SKYBOX) % 1 === 0);
        });

        it ("Taille texture est une puissance de 2", () => {
            assert(Math.log2(TAILLE_REPETITION) % 1 === 0);
        });

        it ("Taille texture est une puissance de 2 et plus petit que skybox", () => {
            expect(TAILLE_REPETITION).toBeLessThanOrEqual(TAILLE_SKYBOX);
            assert(Math.log2(TAILLE_REPETITION) % 1 === 0);
        });
    });
});
