import { ServiceDeRenduPistes } from "./serviceDeRenduPistes";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireScenePiste } from "../scene/GestionnaireScenePiste";
import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { GestionnaireEditionPiste } from "../editeurPiste/gestionnaireEditionPiste";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";

describe("Service de rendu de piste", () => {
    let serviceDeRendu: ServiceDeRenduPistes;
    const gestionnaireEditionPiste: GestionnaireEditionPiste = new GestionnaireEditionPiste(new GestionnaireSouris(),
                                                                                            new GestionnaireCameraPiste(),
                                                                                            new GestionnaireEcran());

    serviceDeRendu = new ServiceDeRenduPistes(new GestionnaireScenePiste(gestionnaireEditionPiste),
                                              new GestionnaireEcran(),
                                              new GestionnaireCameraPiste());

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
