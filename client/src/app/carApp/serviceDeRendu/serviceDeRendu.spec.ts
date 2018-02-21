import * as assert from "assert";
import { TestBed, async } from "@angular/core/testing";

import { ServiceDeRendu } from "./serviceDeRendu";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

describe("Service de rendu", () => {
  let serviceDeRendu: ServiceDeRendu;

  let gestionnaireVoitures: GestionnaireVoitures;
  let gestionnaireSkybox: GestionnaireSkybox;
  let gestionnaireScene: GestionnaireScene;
  let gestionnaireEcran: GestionnaireEcran;
  let gestionnaireCamera: GestionnaireCamera;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionnaireCamera ],
      providers: [ GestionnaireVoitures ]
    });

    gestionnaireVoitures = new GestionnaireVoitures();
    gestionnaireSkybox = new GestionnaireSkybox();
    gestionnaireScene = new GestionnaireScene(gestionnaireSkybox, gestionnaireVoitures);
    gestionnaireEcran = new GestionnaireEcran();
    gestionnaireCamera = new GestionnaireCamera(gestionnaireVoitures);

    serviceDeRendu = new ServiceDeRendu(gestionnaireScene, gestionnaireCamera, gestionnaireEcran);
  }));

  beforeEach(() => {
  });

  describe("Constructeur", () => {
    it("Objet est construit", () => {
      expect(serviceDeRendu).toBeDefined();
    });

    it("Composante utilises sont construites", () => {
      expect(gestionnaireVoitures).toBeDefined();
      expect(gestionnaireSkybox).toBeDefined();
      expect(gestionnaireScene).toBeDefined();
      expect(gestionnaireEcran).toBeDefined();
      expect(gestionnaireCamera).toBeDefined();
    });
  });
});
