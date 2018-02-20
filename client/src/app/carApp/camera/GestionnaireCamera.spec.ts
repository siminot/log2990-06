import * as assert from "assert";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { GestionnaireCamera } from "./GestionnaireCamera";
import { CameraJeu } from "./CameraJeu";
import { CameraJeu3D } from "./CameraJeu3D";
import { CameraJeu2D } from "./CameraJeu2D";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

let gestionnaire: GestionnaireCamera;
let fixture: ComponentFixture<GestionnaireCamera>;

beforeEach(async() => {
  TestBed.configureTestingModule({ declarations: [GestionnaireCamera] });
  fixture = TestBed.createComponent(GestionnaireCamera);
  gestionnaire = fixture.componentInstance;
});

describe("Gestionnaire camera", () => {

  describe("Constructeur", () => {
    it("Objet est construit", () => {
      const gestionnaireCamera: GestionnaireCamera = new GestionnaireCamera(new GestionnaireVoitures());
      expect(gestionnaireCamera).toBeDefined();
    });

    it("Bon nombre de camera initialisees", () => {
      const gestionnaireCamera: GestionnaireCamera = new GestionnaireCamera(new GestionnaireVoitures());
      const NOMBRE_CAMERAS: number = 2;
      expect(gestionnaireCamera["cameras"].length === NOMBRE_CAMERAS);
    });

    it("La premiere camera est 3D", () => {
      const gestionnaireCamera: GestionnaireCamera = new GestionnaireCamera(new GestionnaireVoitures());
      expect(gestionnaireCamera["cameraCourante"] instanceof CameraJeu3D);
    });
  });

  describe("Changement de camera", () => {
    it("Alterner la camera du jeu entre 2D et 3D", () => {
      const gestionnaireCamera: GestionnaireCamera = new GestionnaireCamera(new GestionnaireVoitures());
      let cameraCourante: CameraJeu;
      if (gestionnaireCamera["cameraCourante"] instanceof CameraJeu3D) {
        gestionnaireCamera.changerCamera();
        cameraCourante = gestionnaireCamera["cameraCourante"];
        assert(cameraCourante instanceof CameraJeu2D);
      } else if (gestionnaireCamera["cameraCourante"] instanceof CameraJeu2D) {
        gestionnaireCamera.changerCamera();
        cameraCourante = gestionnaireCamera["cameraCourante"];
        assert(cameraCourante instanceof CameraJeu3D);
      } else {
        assert(false);
      }
    });
  });

});
