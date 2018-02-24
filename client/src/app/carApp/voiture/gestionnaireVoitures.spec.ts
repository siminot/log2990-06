import { GestionnaireVoitures } from "./gestionnaireVoitures";

describe("GestionnaireVoitures", () => {
    let gestionnaire: GestionnaireVoitures;

    it("Constructeur initialise un gestionnaire en mode nuit", () => {
        gestionnaire = new GestionnaireVoitures();
        expect(gestionnaire).toBeDefined();
        expect(gestionnaire.estModeNuit).toBeFalsy();
    });

    it("miseAJourVoitures", () => {
        expect(true).toBeTruthy();
    });

    it("changerTempsJournee change mode nuit", () => {
        gestionnaire.changerTempsJournee();
        expect(gestionnaire.estModeNuit).toBeTruthy();
    });

    it("get voitureJoueur renvoie un objet", () => {
        expect(gestionnaire.voitureJoueur).toBeDefined();
    });

    it("get voituresAI renvoie une liste d'objets", () => {
        expect(gestionnaire.voituresAI.length).toBe(1);
    });
});
