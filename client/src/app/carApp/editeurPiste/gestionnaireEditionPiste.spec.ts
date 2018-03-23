import { GestionnaireEditionPiste } from "./gestionnaireEditionPiste";

import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
describe("TransformateurCoordonnees", () => {
  let gestionnaire: GestionnaireEditionPiste;

  beforeEach(() => {
    gestionnaire = new GestionnaireEditionPiste(new GestionnaireSouris(), new GestionnaireCameraPiste, new GestionnaireEcran());
  });

  describe("Constructeur", () => {
    it("Objet est construit", () => {
      expect(gestionnaire).toBeDefined();
    });
  });
});
