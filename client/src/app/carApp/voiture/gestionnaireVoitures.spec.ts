import { GestionnaireVoitures } from "./gestionnaireVoitures";
import { TempsJournee } from "../skybox/skybox";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";

describe("GestionnaireVoitures", () => {
    let gestionnaire: GestionnaireVoitures;

    beforeEach(() => {
        gestionnaire = new GestionnaireVoitures(new GestionnaireClavier());
        gestionnaire.initialiser();

    });

    it("Constructeur initialise un gestionnaire", () => {
        expect(gestionnaire).toBeDefined();
    });

    it("miseAJourVoitures", () => {
        expect(true).toBeTruthy();
    });

    it("changerTempsJournee change mode nuit", () => {
        const temps: TempsJournee = TempsJournee.Nuit;
        spyOn(gestionnaire["_voitureJoueur"], "allumerPhares");
        gestionnaire.changerTempsJournee(temps);
        expect(gestionnaire["_voitureJoueur"].allumerPhares).toHaveBeenCalled();
    });

    it("changerTempsJournee change mode jour", () => {
        const temps: TempsJournee = TempsJournee.Jour;
        spyOn(gestionnaire["_voitureJoueur"], "eteindrePhares");
        gestionnaire.changerTempsJournee(temps);
        expect(gestionnaire["_voitureJoueur"].eteindrePhares).toHaveBeenCalled();
    });

    it("get voitureJoueur renvoie un objet", () => {
        expect(gestionnaire.voitureJoueur).toBeDefined();
    });

    it("get voituresAI renvoie une liste d'objets", () => {
        expect(gestionnaire.voituresAI.length).toBe(1);
    });
});
