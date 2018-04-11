import { GestionnaireScene } from "./GestionnaireScene";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures, NOMBRE_AI } from "../voiture/gestionnaireVoitures";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, inject } from "@angular/core/testing";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { GestionnaireCollision } from "../collision/gestionnaireCollisions";

const NOMBRE_ELEMENTS_SCENE: number = 3;
const NOMBRE_VOITURES: number = NOMBRE_AI + 1;
const NB_ENFANTS: number = NOMBRE_VOITURES + NOMBRE_ELEMENTS_SCENE;

describe("GestionnaireScene", () => {

    let gestionnaireScene: GestionnaireScene;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GestionnaireScene, GestionnaireScene, GestionnaireSkybox,
                        GestionnaireVoitures, GestionnaireClavier, GestionnaireBDCourse]
        });
    });

    beforeEach(inject([HttpClient], (httpClient: HttpClient) => {
        gestionnaireScene = new GestionnaireScene(new GestionnaireSkybox(),
                                                  new GestionnaireVoitures(new GestionnaireClavier()),
                                                  new GestionnaireBDCourse(httpClient),
                                                  new GestionnaireClavier(),
                                                  new GestionnaireCollision());
    }));

    it("Constructeur", () => {
        expect(gestionnaireScene).toBeDefined();
    });

    it("creerScene", () => {
        gestionnaireScene.creerScene();
        expect(gestionnaireScene.scene.children.length).toBe(NB_ENFANTS);
    });
});
