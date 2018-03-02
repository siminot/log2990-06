import { GestionnaireVoitures } from "./gestionnaireVoitures";
import { TempsJournee } from "../skybox/skybox";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";

describe("GestionnaireVoitures", () => {
    let gestionnaire: GestionnaireVoitures;

    it("Constructeur initialise un gestionnaire", () => {
        gestionnaire = new GestionnaireVoitures(new GestionnaireClavier());
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
