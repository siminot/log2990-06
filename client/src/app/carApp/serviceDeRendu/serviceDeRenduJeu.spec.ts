import { TestBed, async } from "@angular/core/testing";

import { ServiceDeRenduJeu } from "./serviceDeRenduJeu";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";

describe("Service de rendu", () => {
  let serviceDeRendu: ServiceDeRenduJeu;

  let gestionnaireVoitures: GestionnaireVoitures;
  let gestionnaireSkybox: GestionnaireSkybox;
  let gestionnaireScene: GestionnaireScene;
  let gestionnaireEcran: GestionnaireEcran;
  let gestionnaireCamera: GestionnaireCamera;
  let gestionnaireClavier: GestionnaireClavier;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionnaireCamera ],
      providers: [ GestionnaireVoitures ]
    });

    gestionnaireClavier = new GestionnaireClavier();
    gestionnaireVoitures = new GestionnaireVoitures(gestionnaireClavier);
    gestionnaireSkybox = new GestionnaireSkybox();
    gestionnaireScene = new GestionnaireScene(gestionnaireSkybox, gestionnaireVoitures, gestionnaireClavier);
    gestionnaireEcran = new GestionnaireEcran();
    gestionnaireCamera = new GestionnaireCamera(gestionnaireVoitures, gestionnaireClavier);

    serviceDeRendu = new ServiceDeRenduJeu(gestionnaireScene, gestionnaireEcran, gestionnaireCamera);
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
      spyOn(serviceDeRendu["renderer"], "render");
      await serviceDeRendu.initialiser();
      expect(serviceDeRendu["renderer"].render).toHaveBeenCalled();
    });
  });

  describe("Redimensionnement", () => {
    it("Renderer mis à jour", async () => {
      spyOn(serviceDeRendu["renderer"], "setSize");
      serviceDeRendu.redimensionnement();
      expect(serviceDeRendu["renderer"].setSize).toHaveBeenCalled();
    });

    it("Cameras mises à jour", async () => {
      spyOn(serviceDeRendu["gestionnaireCamera"], "redimensionnement");
      serviceDeRendu.redimensionnement();
      expect(serviceDeRendu["gestionnaireCamera"].redimensionnement).toHaveBeenCalled();
    });
  });
});
