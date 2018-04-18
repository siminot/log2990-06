import { GestionnaireClavier } from "./gestionnaireClavier";

describe("GestionnaireClavier", () => {

    let gestionnaire: GestionnaireClavier;

    it("Constructeur", () => {
        gestionnaire = new GestionnaireClavier();
        expect(gestionnaire["listeRappel"]).toBeDefined();
        expect(gestionnaire["evenementRecu"]).toBeDefined();
    });
});
