import { GestionnaireScenePiste, PROFONDEUR_SCENE } from "./GestionnaireScenePiste";
import { GestionnaireEditionPiste } from "../editeurPiste/gestionnaireEditionPiste";
import { PLAN_ELOIGNE, PLAN_RAPPROCHE, GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { Mesh, Object3D, PlaneGeometry } from "three";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, inject } from "@angular/core/testing";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { HttpClient } from "@angular/common/http";

let gestionnaire: GestionnaireScenePiste;

describe("GestionnaireScenePiste", () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GestionnaireScenePiste, GestionnaireEditionPiste, GestionnaireBDCourse,
                        GestionnaireSouris, GestionnaireCameraPiste, GestionnaireEcran]
        });
    });

    beforeEach(inject([HttpClient], (httpClient: HttpClient) => {
        const bd: GestionnaireBDCourse = new GestionnaireBDCourse(httpClient);
        const editeurPiste: GestionnaireEditionPiste = new GestionnaireEditionPiste(bd,
                                                                                    new GestionnaireSouris(),
                                                                                    new GestionnaireCameraPiste(),
                                                                                    new GestionnaireEcran());
        gestionnaire = new GestionnaireScenePiste(editeurPiste);
    }));

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
