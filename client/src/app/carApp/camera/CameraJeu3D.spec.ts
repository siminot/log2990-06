import { TestBed, inject } from "@angular/core/testing";

import { CameraJeu3D } from "./CameraJeu3D";

import * as assert from "assert";

describe("CameraJeu3D", () => {

  let cameraJeu3D: CameraJeu3D;

  it("Constructeur", () => {
    cameraJeu3D = new CameraJeu3D();
    expect(cameraJeu3D).toBeDefined();
  });

  it("zoomer", () => {
    const distanceDebut: number = cameraJeu3D["distance"];
    cameraJeu3D.zoomer();
    const distanceFin: number = cameraJeu3D["distance"];

    expect(distanceDebut).toBeGreaterThanOrEqual(distanceFin);

  });

  it("desoomer", () => {

    const distanceDebut: number = cameraJeu3D["distance"];
    cameraJeu3D.zoomer();
    const distanceFin: number = cameraJeu3D["distance"];

    expect(distanceDebut).toBeLessThanOrEqual(distanceFin);

  });

  it("redimensionnement", () => {

    const nouvLargeur: number = 120;
    const nouvHauteur: number = 120;

    cameraJeu3D.redimensionnement(nouvLargeur, nouvHauteur);

    const nouvAspect: number = cameraJeu3D["_camera"]["aspect"];

    assert(nouvAspect === nouvLargeur / nouvLargeur);
  });

});
