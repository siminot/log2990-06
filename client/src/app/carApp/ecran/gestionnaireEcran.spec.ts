import { GestionnaireEcran } from "./gestionnaireEcran";

describe("GestionnaireEcran", () => {
    let gestionnaireEcran: GestionnaireEcran;

    const conteneur: HTMLDivElement = document.createElement("div");
    const elementHTML: HTMLElement = document.createElement("div");

    it("Instantiable avec le constructeur", () => {
        gestionnaireEcran = new GestionnaireEcran();
        expect(gestionnaireEcran).toBeDefined();
        expect(gestionnaireEcran["conteneur"]).toBeDefined();
    });

    it("Ajout d'un conteneur", () => {
        gestionnaireEcran.initialiserConteneur(conteneur);
        expect(gestionnaireEcran["conteneur"]).not.toEqual(null);
    });

    it("Ajout d'un element dans le conteneur", () => {
        expect(gestionnaireEcran["conteneur"].childElementCount).toEqual(0);
        gestionnaireEcran.ajouterElementConteneur(elementHTML);
        expect(gestionnaireEcran["conteneur"].childElementCount).toEqual(1);
    });

    it("Obtention du ratio", () => {
        const RATIO: number = conteneur.clientWidth / conteneur.clientHeight;
        expect(gestionnaireEcran.ratio).toEqual(RATIO);
    });
});
