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

  describe("Constructeur", () => {
    it("Objet est construit", () => {
      expect(serviceDeRendu).toBeDefined();
    });

    it("Composants utilisés sont construits", () => {
      expect(serviceDeRendu["gestionnaireScene"]).toBeDefined();
      expect(serviceDeRendu["gestionnaireCamera"]).toBeDefined();
      expect(serviceDeRendu["gestionnaireEcran"]).toBeDefined();
    });
  });

  describe("Initialisation", () => {
    it("Boucle de rendue partie", async () => {
      await serviceDeRendu.initialiser();
      spyOn(serviceDeRendu["renderer"], "render");
      expect(serviceDeRendu["renderer"].render).toHaveBeenCalled();
    });
  });

  describe("Redimensionnement", () => {
    it("Renderer mis à jour", async () => {
      await serviceDeRendu.initialiser();
      const fonctionSetSize: Function = serviceDeRendu["renderer"].setSize;
      serviceDeRendu.redimensionnement();
      expect(fonctionSetSize).toHaveBeenCalled();
    });

    it("Cameras mises à jour", async () => {
      await serviceDeRendu.initialiser();
      const redimensionnementCameras: Function = serviceDeRendu["gestionnaireCamera"].redimensionnement;
      serviceDeRendu.redimensionnement();
      expect(redimensionnementCameras).toHaveBeenCalled();
    });
  });
});
