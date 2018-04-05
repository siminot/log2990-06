import * as assert from "assert";
import { Skybox, TAILLE_REPETITION, TAILLE_SKYBOX } from "./skybox";
import { ElementsInitialisationSkybox } from "./gestionnaireSkybox";
import { TempsJournee } from "./tempsJournee";

const NBR_ELEMENTS_NUIT: number = 2;
const NBR_ELEMENTS_JOUR: number = NBR_ELEMENTS_NUIT + 1;

describe ("Skybox", () => {
    let skybox: Skybox;

    const initialisationNuit: ElementsInitialisationSkybox = new ElementsInitialisationSkybox(TempsJournee.Nuit, "nuit2", "pave1");
    const initialisationJour: ElementsInitialisationSkybox = new ElementsInitialisationSkybox(TempsJournee.Jour, "jour1", "grass2");

    describe ("Construction", () => {
        it ("Une skybox de nuit est bien construite", () => {
            skybox = new Skybox(initialisationNuit);
            expect(skybox).toBeDefined();
            expect(skybox.children.length).toEqual(NBR_ELEMENTS_NUIT);
        });

        it ("Une skybox de jour est bien construite", () => {
            skybox = new Skybox(initialisationJour);
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
