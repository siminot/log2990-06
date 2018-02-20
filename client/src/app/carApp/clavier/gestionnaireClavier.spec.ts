import { GestionnaireClavier } from "./gestionnaireClavier";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";
import { GestionnaireScene } from "../scene/GestionnaireScene";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";

describe("gestionnaireClavier", () => {
    let gestionnaireClavier: GestionnaireClavier;
    let gestionnaireCamera: GestionnaireCamera;
    let gestionnaireScene: GestionnaireScene;
    let gestionnaireVoitures: GestionnaireVoitures;
    let gestionnaireSkybox: GestionnaireSkybox;

    it("constructeur", () => {
        gestionnaireVoitures = new GestionnaireVoitures();
        gestionnaireCamera = new GestionnaireCamera(gestionnaireVoitures);
        gestionnaireSkybox = new GestionnaireSkybox();
        gestionnaireScene = new GestionnaireScene(gestionnaireSkybox, gestionnaireVoitures);
        gestionnaireClavier = new GestionnaireClavier(gestionnaireCamera, gestionnaireVoitures, gestionnaireScene);
        expect(gestionnaireClavier).toBeDefined();
    });
});
