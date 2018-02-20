import * as assert from "assert";
import { CameraJeu2D, ZOOM_MINIMUM, ZOOM_DEFAUT, ZOOM_MAXIMUM, PAS_ZOOM,
         PLAN_RAPPROCHE, PLAN_ELOIGNE } from "./CameraJeu2D";

describe("CameraJeu2D", () => {

  let cameraJeu2D: CameraJeu2D;

  it("Constructeur", () => {
    cameraJeu2D = new CameraJeu2D();
    expect(cameraJeu2D).toBeDefined();
  });

  describe("Constructeur", () => {
    it("Objet est construit", () => {
      cameraJeu2D = new CameraJeu2D();
      expect(cameraJeu2D).toBeDefined();
    });

    it("Zoom recoit la valeur par defaut", () => {
      cameraJeu2D = new CameraJeu2D();
      expect(cameraJeu2D["zoom"]).toEqual(ZOOM_DEFAUT);
    });

    it("Camera recoit les bonnes valeurs de plans", () => {
      cameraJeu2D = new CameraJeu2D();
      expect(cameraJeu2D["camera"].near).toEqual(PLAN_RAPPROCHE);
      expect(cameraJeu2D["camera"].far).toEqual(PLAN_ELOIGNE);
    });

  });

  describe("Constantes pour zoom", () => {
    it("Zoom minimal est positif et <= zoom maximal", () => {
      assert(ZOOM_MINIMUM <= ZOOM_MAXIMUM && ZOOM_MINIMUM >= 0);
    });

    it("Zoom maximal est positif et >= zoom minimal", () => {
      assert(ZOOM_MAXIMUM >= ZOOM_MINIMUM && ZOOM_MAXIMUM >= 0);
    });

    it("Zoom par defaut est borne par valeur min et max", () => {
      assert(ZOOM_MINIMUM <= ZOOM_DEFAUT && ZOOM_DEFAUT <= ZOOM_MAXIMUM);
    });

    it("Pas du zoom permet un nombre de gradations suffisantes", () => {
      const NOMBRE_GRADATIONS: number = 10;
      assert((ZOOM_MAXIMUM - ZOOM_MINIMUM) / PAS_ZOOM >= NOMBRE_GRADATIONS);
    });

  });

  describe("Constantes pour camera", () => {
    it("Plan rapproche est valide", () => {
      assert(PLAN_RAPPROCHE >= 0 && PLAN_RAPPROCHE < PLAN_ELOIGNE);
    });

    it("Plan eloigne est valide", () => {
      assert(PLAN_ELOIGNE >= 0 && PLAN_ELOIGNE > PLAN_RAPPROCHE);
    });
  });

  describe("Methode zoomer", () => {
    it("Ne depasse pas la valeur maximale", () => {
      let zoomDebut: number;
      let zoomFin: number;

      do {
        zoomDebut = cameraJeu2D["zoom"];
        cameraJeu2D.zoomer();
        zoomFin = cameraJeu2D["zoom"];
      }
      while (zoomDebut !== ZOOM_MAXIMUM);

      expect(zoomFin).toEqual(ZOOM_MAXIMUM);
    });

    it("Augmente le zoom", () => {
      const zoomDebut: number = cameraJeu2D["zoom"];
      cameraJeu2D.zoomer();
      const zoomFin: number = cameraJeu2D["zoom"];

      expect(zoomDebut).toBeLessThanOrEqual(zoomFin);
    });
  });

  describe("Methode dezoomer", () => {
    it("Ne depasse pas la valeur minimale", () => {
      let zoomDebut: number;
      let zoomFin: number;

      do {
        zoomDebut = cameraJeu2D["zoom"];
        cameraJeu2D.dezoomer();
        zoomFin = cameraJeu2D["zoom"];
      }
      while (zoomDebut !== ZOOM_MINIMUM);

      expect(zoomFin).toEqual(ZOOM_MINIMUM);
    });

    it("Augmente le zoom", () => {
      const zoomDebut: number = cameraJeu2D["zoom"];
      cameraJeu2D.dezoomer();
      const zoomFin: number = cameraJeu2D["zoom"];

      expect(zoomFin).toBeLessThanOrEqual(zoomDebut);
    });
  });

  it("Redimensionnement", () => {
    const REDIMENSIONNEMENT: number = 120;
    const nouvLargeur: number = cameraJeu2D["largeur"] + REDIMENSIONNEMENT;
    const nouvHauteur: number = cameraJeu2D["hauteur"] - REDIMENSIONNEMENT;

    cameraJeu2D.redimensionnement(nouvLargeur, nouvHauteur);

    const redLargeur: number = cameraJeu2D["largeur"];
    const redHauteur: number = cameraJeu2D["hauteur"];

    assert(nouvLargeur === redLargeur && nouvHauteur === redHauteur);
  });

});
