import { TestBed, inject } from "@angular/core/testing";

import { GestionnaireCamera } from "./GestionnaireCamera";
import { CameraJeu } from "./CameraJeu";
import { GestionnaireVoitures } from "./../voiture/gestionnaireVoitures";

import * as assert from "assert";
import { Camera } from "three";
import { CameraJeu3D } from "./CameraJeu3D";

describe("Gestionnaire camera", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [GestionnaireCamera]
    });
  });

  const gestionnaireVoitures: GestionnaireVoitures =  new GestionnaireVoitures();
  const gestionnaireCamera: GestionnaireCamera = new GestionnaireCamera(gestionnaireVoitures);

  it("Constructeur", () => {
    expect(gestionnaireCamera).toBeDefined();

  });

  it("Le gestionnaire devrait avoir 2 cameras", () => {

    const nbCameras: number = gestionnaireCamera["cameras"].length;
    const deux: number = 2;

    assert(nbCameras === deux);
  });

  it("La premiere camera est 3D", () => {
    const cameraCourante: CameraJeu = gestionnaireCamera["cameraCourante"];

    expect (cameraCourante instanceof CameraJeu3D);

  });

});
