import { TestBed, inject } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ServiceDeRenduJeu } from "./serviceDeRenduJeu";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

describe("Service de rendu de jeu", () => {
    let serviceDeRendu: ServiceDeRenduJeu;

    let gestionnaireVoitures: GestionnaireVoitures;
    let gestionnaireSkybox: GestionnaireSkybox;
    let gestionnaireScene: GestionnaireScene;
    let gestionnaireEcran: GestionnaireEcran;
    let gestionnaireCamera: GestionnaireCamera;
    let gestionnaireBD: GestionnaireBDCourse;
    let gestionnaireClavier: GestionnaireClavier;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ServiceDeRenduJeu, GestionnaireBDCourse, GestionnaireClavier, GestionnaireVoitures,
                        GestionnaireSkybox, GestionnaireScene, GestionnaireEcran, GestionnaireCamera ]
        });
    });

    beforeEach(inject([HttpClient], (httpClient: HttpClient) => {
        gestionnaireBD = new GestionnaireBDCourse(httpClient);
        gestionnaireClavier = new GestionnaireClavier();
        gestionnaireVoitures = new GestionnaireVoitures(gestionnaireClavier);
        gestionnaireSkybox = new GestionnaireSkybox();
        gestionnaireScene = new GestionnaireScene(gestionnaireSkybox, gestionnaireVoitures, gestionnaireBD,
                                                  gestionnaireClavier);
        gestionnaireEcran = new GestionnaireEcran();
        gestionnaireCamera = new GestionnaireCamera(gestionnaireVoitures, gestionnaireClavier);
        serviceDeRendu = new ServiceDeRenduJeu(gestionnaireScene, gestionnaireEcran, gestionnaireCamera);
    }));

    describe("Constructeur", () => {
        it("Objet est construit", () => {
            expect(serviceDeRendu).toBeDefined();
        });

        it("Composants utilisés sont construits", () => {
            expect(serviceDeRendu["gestionnaireScene"]).toBeDefined();
            expect(serviceDeRendu["gestionnaireCamera"]).toBeDefined();
            expect(serviceDeRendu["gestionnaireEcran"]).toBeDefined();
        });
    });

    describe("Initialisation", () => {
        it("Boucle de rendue partie", async () => {
            spyOn(serviceDeRendu["renderer"], "render");
            await serviceDeRendu.initialiser();
            expect(serviceDeRendu["renderer"].render).toHaveBeenCalled();
        });
    });

    describe("Redimensionnement", () => {
        it("Renderer mis à jour", async () => {
            spyOn(serviceDeRendu["renderer"], "setSize");
            serviceDeRendu.redimensionnement();
            expect(serviceDeRendu["renderer"].setSize).toHaveBeenCalled();
        });

        it("Cameras mises à jour", async () => {
            spyOn(serviceDeRendu["gestionnaireCamera"], "redimensionnement");
            serviceDeRendu.redimensionnement();
            expect(serviceDeRendu["gestionnaireCamera"].redimensionnement).toHaveBeenCalled();
        });
    });
});
