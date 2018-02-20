import { TestBed, inject } from "@angular/core/testing";

import { CameraJeu2D } from "./CameraJeu2D";

import * as assert from "assert";

describe("CameraJeu2D", () => {

  let cameraJeu2D: CameraJeu2D;

  it("Constructeur", () => {
    cameraJeu2D = new CameraJeu2D();
    expect(cameraJeu2D).toBeDefined();
  });

  it("zoomer", () => {
    const zoomDebut: number = cameraJeu2D["zoom"];
    cameraJeu2D.zoomer();
    const zoomFin: number = cameraJeu2D["zoom"];

    expect(zoomDebut).toBeLessThanOrEqual(zoomFin);

  });

  it("desoomer", () => {

    const zoomDebut: number = cameraJeu2D["zoom"];
    cameraJeu2D.dezoomer();
    const zoomFin: number = cameraJeu2D["zoom"];

    expect(zoomDebut).toBeGreaterThanOrEqual(zoomFin);

  });

  it("redimensionnement", () => {

    const nouvLargeur: number = 120;
    const nouvHauteur: number = 120;

    cameraJeu2D.redimensionnement(nouvLargeur, nouvHauteur);

    const redLargeur: number = cameraJeu2D["largeur"];
    const redHauteur: number = cameraJeu2D["hauteur"];

    assert(nouvLargeur === redLargeur && nouvHauteur === redHauteur);
  });

});
