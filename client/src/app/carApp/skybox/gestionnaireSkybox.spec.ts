import { GestionnaireSkybox } from "./gestionnaireSkybox";
import { TempsJournee } from "./skybox";

describe ("GestionnaireSkybox", () => {
    let gestionnaire: GestionnaireSkybox;

    it ("Constructeur", () => {
        gestionnaire = new GestionnaireSkybox();
        expect(gestionnaire).toBeDefined();
        expect(gestionnaire.skybox).toBeDefined();
    });

    it ("Changer decor", () => {
        const skyboxAvant: string = gestionnaire["skyboxCourante"]["URL_ENVIRONNEMENT"];
        const tempsAvant: TempsJournee = gestionnaire["skyboxCourante"]["tempsJournee"];
        gestionnaire.changerDecor();
        const skyboxApres: string = gestionnaire["skyboxCourante"]["URL_ENVIRONNEMENT"];
        const tempsApres: TempsJournee = gestionnaire["skyboxCourante"]["tempsJournee"];
        expect(skyboxAvant).not.toEqual(skyboxApres);
        expect(tempsAvant).toEqual(tempsApres);
    });

    it ("Changer temps journee pour jour", () => {
        gestionnaire.changerTempsJournee(TempsJournee.Nuit);
        const tempsTest: TempsJournee = TempsJournee.Jour;
        const skyboxAvant: string = gestionnaire["skyboxCourante"]["URL_ENVIRONNEMENT"];
        const tempsAvant: TempsJournee = gestionnaire["skyboxCourante"]["tempsJournee"];
        gestionnaire.changerTempsJournee(tempsTest);
        const skyboxApres: string = gestionnaire["skyboxCourante"]["URL_ENVIRONNEMENT"];
        const tempsApres: TempsJournee = gestionnaire["skyboxCourante"]["tempsJournee"];
        expect(skyboxAvant).not.toEqual(skyboxApres);
        expect(tempsApres).toEqual(tempsTest);
        expect(tempsApres).not.toEqual(tempsAvant);
    });

    it ("Changer temps journee pour nuit", () => {
        gestionnaire.changerTempsJournee(TempsJournee.Jour);
        const tempsTest: TempsJournee = TempsJournee.Nuit;
        const skyboxAvant: string = gestionnaire["skyboxCourante"]["URL_ENVIRONNEMENT"];
        const tempsAvant: TempsJournee = gestionnaire["skyboxCourante"]["tempsJournee"];
        gestionnaire.changerTempsJournee(tempsTest);
        const skyboxApres: string = gestionnaire["skyboxCourante"]["URL_ENVIRONNEMENT"];
        const tempsApres: TempsJournee = gestionnaire["skyboxCourante"]["tempsJournee"];
        expect(skyboxAvant).not.toEqual(skyboxApres);
        expect(tempsApres).toEqual(tempsTest);
        expect(tempsApres).not.toEqual(tempsAvant);
    });
});
