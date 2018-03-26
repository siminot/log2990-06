import { ServiceDeRenduPistes } from "./serviceDeRenduPistes";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireScenePiste } from "../scene/GestionnaireScenePiste";
import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { GestionnaireEditionPiste } from "../editeurPiste/gestionnaireEditionPiste";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { TestBed, inject } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

describe("Service de rendu de piste", () => {

    let serviceDeRendu: ServiceDeRenduPistes;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ServiceDeRenduPistes, GestionnaireEcran, GestionnaireScenePiste,
                        GestionnaireEditionPiste, GestionnaireSouris, GestionnaireCameraPiste]
        });
    });

    beforeEach(inject([HttpClient], (httpClient: HttpClient) => {
        const gestionnaireEcran: GestionnaireEcran = new GestionnaireEcran();
        const gestionnaireCamera: GestionnaireCameraPiste = new GestionnaireCameraPiste();
        const gestionnaireEditionPiste: GestionnaireEditionPiste = new GestionnaireEditionPiste(
                                                                        new GestionnaireBDCourse(httpClient),
                                                                        new GestionnaireSouris(),
                                                                        gestionnaireCamera,
                                                                        gestionnaireEcran);
        serviceDeRendu = new ServiceDeRenduPistes(new GestionnaireScenePiste(gestionnaireEditionPiste),
                                                  gestionnaireEcran,
                                                  gestionnaireCamera);
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
