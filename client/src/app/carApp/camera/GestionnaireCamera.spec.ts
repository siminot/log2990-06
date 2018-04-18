import * as assert from "assert";
import { TestBed, async } from "@angular/core/testing";

import { GestionnaireCamera } from "./GestionnaireCamera";
import { CameraJeu } from "./CameraJeu";
import { CameraJeu3D } from "./CameraJeu3D";
import { CameraJeu2D } from "./CameraJeu2D";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";

describe("Gestionnaire camera", () => {
  let gestionnaireCamera: GestionnaireCamera;
  let gestionnaireVoitures: GestionnaireVoitures;
  let gestionnaireClavier: GestionnaireClavier;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionnaireCamera ],
      providers: [ GestionnaireVoitures, GestionnaireClavier ]
    });

    gestionnaireClavier = new GestionnaireClavier();
    gestionnaireVoitures = new GestionnaireVoitures(gestionnaireClavier);
    gestionnaireCamera = new GestionnaireCamera(gestionnaireVoitures, gestionnaireClavier);
  }));

  beforeEach(() => {
  });

  describe("Constructeur", () => {
    it("Objet est construit", () => {
      expect(gestionnaireCamera).toBeDefined();
    });

    it("Composante utilises sont construites", () => {
      expect(gestionnaireVoitures).toBeDefined();
    });

    it("Bon nombre de camera initialisees", () => {
      const NOMBRE_CAMERAS: number = 2;
      expect(gestionnaireCamera["cameras"].length === NOMBRE_CAMERAS);
    });

    it("La premiere camera est 3D", () => {
      expect(gestionnaireCamera["cameraCourante"] instanceof CameraJeu3D);
    });
  });

  describe("Changement de camera", () => {
    it("Alterner la camera du jeu entre 2D et 3D", () => {
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
