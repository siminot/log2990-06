import { GestionnaireCameraPiste, PLAN_ELOIGNE, PLAN_RAPPROCHE, ZOOM_DEFAUT } from "./GestionnaireCameraPiste";
import { OrthographicCamera } from "three";

describe("CameraJeu3D", () => {

    let gestionnaire: GestionnaireCameraPiste;

    describe("Constructeur", () => {
        it("Objet est construit", () => {
            gestionnaire = new GestionnaireCameraPiste();
            expect(gestionnaire).toBeDefined();
        });
    });

    describe("Constantes de la camera", () => {
        it("Distances des plans sont logiques", () => {
            expect(PLAN_RAPPROCHE <= PLAN_ELOIGNE).toBeTruthy();
            expect(PLAN_RAPPROCHE).toBeLessThanOrEqual(0);
            expect(PLAN_ELOIGNE).toBeGreaterThanOrEqual(0);
        });

        it("Zoom est correcte", () => {
            expect(ZOOM_DEFAUT).toBeGreaterThan(0);
        });
    });

    it("Le redimenssionnement est bien effectue", () => {
        if (gestionnaire.camera instanceof OrthographicCamera) {
            const LARGEUR: number = 640;
            const HAUTEUR: number = 480;
            expect(gestionnaire.camera.right - gestionnaire.camera.left).not.toEqual(LARGEUR);
            expect(gestionnaire.camera.top - gestionnaire.camera.bottom).not.toEqual(HAUTEUR);
            gestionnaire.redimensionnement(LARGEUR, HAUTEUR);
            expect(gestionnaire.camera.right - gestionnaire.camera.left).toEqual(LARGEUR);
            expect(gestionnaire.camera.top - gestionnaire.camera.bottom).toEqual(HAUTEUR);
        } else {
            expect(false).toBeTruthy();
        }
    });
});
