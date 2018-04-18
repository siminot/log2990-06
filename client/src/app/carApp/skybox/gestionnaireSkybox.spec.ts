import { GestionnaireSkybox, SKYBOX } from "./gestionnaireSkybox";
import { TempsJournee } from "./tempsJournee";
import { NOM_TEXTURE_PISTE } from "../elementsAffichage/jeu/segmentPiste";

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

    it ("La surface hors-piste est différente de la piste", () => {
        for (const element of SKYBOX) {
            expect(element.plancher).not.toEqual(NOM_TEXTURE_PISTE);
        }
    });
});
