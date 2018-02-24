import { GestionnaireSkybox } from "./gestionnaireSkybox";
import { Mesh } from "three";

describe ("GestionnaireSkybox", () => {
    let gestionnaire: GestionnaireSkybox;
    let SKYBOX_NUIT_1: Mesh;
    let SKYBOX_NUIT_2: Mesh;
    let SKYBOX_JOUR_1: Mesh;

    it ("Constructeur", () => {
        gestionnaire = new GestionnaireSkybox();
        expect(gestionnaire).toBeDefined();
        expect(gestionnaire.skybox).toBeDefined();
    });

    it ("Changer decor nuit", () => {
        SKYBOX_NUIT_1 = gestionnaire.skybox;
        gestionnaire.changerDecor();
        expect(gestionnaire.skybox).not.toEqual(SKYBOX_NUIT_1);
    });

    it ("Changer temps journee", () => {
        SKYBOX_NUIT_2 = gestionnaire.skybox;
        gestionnaire.changerTempsJournee();
        expect(gestionnaire.skybox).not.toEqual(SKYBOX_NUIT_2);
        expect(gestionnaire.skybox).not.toEqual(SKYBOX_NUIT_1);
    });

    it ("Changer decor jour", () => {
        SKYBOX_JOUR_1 = gestionnaire.skybox;
        gestionnaire.changerDecor();
        expect(gestionnaire.skybox).not.toEqual(SKYBOX_JOUR_1);
        expect(gestionnaire.skybox).not.toEqual(SKYBOX_NUIT_2);
        expect(gestionnaire.skybox).not.toEqual(SKYBOX_NUIT_1);
    });
});
