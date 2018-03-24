import { TransformateurCoordonnees } from "./transformateurCoordonnees";

import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
describe("TransformateurCoordonnees", () => {
  let transform: TransformateurCoordonnees;

  beforeEach(() => {
    transform = new TransformateurCoordonnees(new GestionnaireCameraPiste(), new GestionnaireEcran());
  });

  describe("Constructeur", () => {
    it("Objet est construit", () => {
      expect(transform).toBeDefined();
    });

    it("Composants utilisés sont construits", () => {
      expect(transform["gestionnaireCamera"]).toBeDefined();
      expect(transform["gestionnaireEcran"]).toBeDefined();
    });
  });
});
