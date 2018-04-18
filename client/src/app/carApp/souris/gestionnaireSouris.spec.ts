import { GestionnaireSouris } from "./gestionnaireSouris";

describe("GestionnaireSouris", () => {

    let gestionnaire: GestionnaireSouris;

    it("Constructeur", () => {
        gestionnaire = new GestionnaireSouris();
        expect(gestionnaire["listeRappel"]).toBeDefined();
        expect(gestionnaire["evenementRecu"]).toBeDefined();
    });
});
