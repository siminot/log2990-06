import { GestionnaireScenePiste, PROFONDEUR_SCENE } from "./GestionnaireScenePiste";
import { GestionnaireEditionPiste } from "../editeurPiste/gestionnaireEditionPiste";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { GestionnaireCameraPiste, PLAN_ELOIGNE, PLAN_RAPPROCHE } from "../camera/GestionnaireCameraPiste";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { Mesh, Object3D, PlaneGeometry } from "three";

describe("GestionnaireScenePiste", () => {
    let gestionnaire: GestionnaireScenePiste;
    const gestionnaireEditionPiste: GestionnaireEditionPiste =
        new GestionnaireEditionPiste(new GestionnaireSouris(),
                                     new GestionnaireCameraPiste(),
                                     new GestionnaireEcran());

    gestionnaire = new GestionnaireScenePiste(gestionnaireEditionPiste);

    describe("Constructeur", () => {
        it("Objet est construit", () => {
            expect(gestionnaire).toBeDefined();
        });
    });

    describe("Initialisation", () => {
        it("La scene comporte le bon nombre d'elements", () => {
            const NOMBRE_ENFANTS: number = 2;
            expect(gestionnaire.children.length).toEqual(NOMBRE_ENFANTS);
        });

        it("La profondeur est visible pour la camera", () => {
            expect(PROFONDEUR_SCENE).toBeGreaterThanOrEqual(PLAN_RAPPROCHE);
            expect(PROFONDEUR_SCENE).toBeLessThanOrEqual(PLAN_ELOIGNE);
        });

        it("Le decor est a la bonne profondeur", () => {
            const OBJECT: Object3D = gestionnaire.children[0];
            if (OBJECT instanceof Mesh && OBJECT.geometry instanceof PlaneGeometry) {
                expect(OBJECT.geometry.vertices[0].y).toBeCloseTo(PROFONDEUR_SCENE);
            } else {
                expect(false).toBeTruthy();
            }
        });
    });
});
