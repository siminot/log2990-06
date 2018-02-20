import * as assert from "assert";
import { CameraJeu3D, DISTANCE_MINIMUM, DISTANCE_DEFAUT, DISTANCE_MAXIMUM, PAS_DISTANCE,
         PLAN_RAPPROCHE, PLAN_ELOIGNE, CHAMP_DE_VISION } from "./CameraJeu3D";

describe("CameraJeu3D", () => {

  let cameraJeu3D: CameraJeu3D;

  it("Constructeur", () => {
    cameraJeu3D = new CameraJeu3D();
    expect(cameraJeu3D).toBeDefined();
  });

  describe("Constructeur", () => {
    it("Objet est construit", () => {
      cameraJeu3D = new CameraJeu3D();
      expect(cameraJeu3D).toBeDefined();
    });

    it("Distance recoit la valeur par defaut", () => {
      cameraJeu3D = new CameraJeu3D();
      expect(cameraJeu3D["distance"]).toEqual(DISTANCE_DEFAUT);
    });

    it("Camera recoit les bonnes valeurs de plans", () => {
      cameraJeu3D = new CameraJeu3D();
      expect(cameraJeu3D["camera"].near).toEqual(PLAN_RAPPROCHE);
      expect(cameraJeu3D["camera"].far).toEqual(PLAN_ELOIGNE);
      expect(cameraJeu3D["camera"].fov).toEqual(CHAMP_DE_VISION);
    });

  });

  describe("Constantes la distance de la camera", () => {
    it("Distance minimale est positive et <= distance maximale", () => {
      assert(DISTANCE_MINIMUM <= DISTANCE_MAXIMUM && DISTANCE_MINIMUM >= 0);
    });

    it("Distance maximale est positive et >= distance minimale", () => {
      assert(DISTANCE_MAXIMUM >= DISTANCE_MINIMUM && DISTANCE_MAXIMUM >= 0);
    });

    it("Distance par defaut est borne par valeur min et max", () => {
      assert(DISTANCE_MINIMUM <= DISTANCE_DEFAUT && DISTANCE_DEFAUT <= DISTANCE_MAXIMUM);
    });

    it("Pas du zoom permet un nombre de gradations suffisantes", () => {
      const NOMBRE_GRADATIONS: number = 10;
      assert((DISTANCE_MAXIMUM - DISTANCE_MINIMUM) / PAS_DISTANCE >= NOMBRE_GRADATIONS);
    });

  });

  describe("Constantes pour camera", () => {
    it("Plan rapproche est valide", () => {
      assert(PLAN_RAPPROCHE >= 0 && PLAN_RAPPROCHE < PLAN_ELOIGNE);
    });

    it("Plan eloigne est valide", () => {
      assert(PLAN_ELOIGNE >= 0 && PLAN_ELOIGNE > PLAN_RAPPROCHE);
    });

    it("Champ de vision est valide", () => {
      assert(CHAMP_DE_VISION >= 0);
    });
  });

  describe("Methode zoomer", () => {
    it("Ne depasse pas la valeur maximale", () => {
      let distanceDebut: number;
      let distanceFin: number;

      do {
        distanceDebut = cameraJeu3D["distance"];
        cameraJeu3D.zoomer();
        distanceFin = cameraJeu3D["distance"];
      }
      while (distanceDebut !== DISTANCE_MINIMUM);

      expect(distanceFin).toBeLessThanOrEqual(DISTANCE_MAXIMUM);
    });

    it("Diminue la distance entre objet et camera", () => {
      const distanceDebut: number = cameraJeu3D["distance"];
      cameraJeu3D.zoomer();
      const distanceFin: number = cameraJeu3D["distance"];

      expect(distanceFin).toBeLessThanOrEqual(distanceDebut);
    });
  });

  describe("Methode dezoomer", () => {
    it("Ne depasse pas la valeur maximale", () => {
      let distanceDebut: number;
      let distanceFin: number;

      do {
        distanceDebut = cameraJeu3D["distance"];
        cameraJeu3D.dezoomer();
        distanceFin = cameraJeu3D["distance"];
      }
      while (distanceDebut !== DISTANCE_MAXIMUM);

      expect(distanceFin).toEqual(DISTANCE_MAXIMUM);
    });

    it("Augmente la distance entre objet et camera", () => {
      const distanceDebut: number = cameraJeu3D["distance"];
      cameraJeu3D.dezoomer();
      const distanceFin: number = cameraJeu3D["distance"];

      expect(distanceFin).toBeGreaterThanOrEqual(distanceDebut);
    });
  });

  it("Redimensionnement", () => {
    const nouvLargeur: number = 640;
    const nouvHauteur: number = 480;

    cameraJeu3D.redimensionnement(nouvLargeur, nouvHauteur);

    expect(cameraJeu3D["_camera"]["aspect"]).toBeCloseTo(nouvLargeur / nouvHauteur);
  });
});
