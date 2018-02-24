import { GestionnaireScene } from "./GestionnaireScene";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "../voiture/gestionnaireVoitures";

const NB_ENFANTS: number = 3;

describe("GestionnaireScence", () => {

    let gestionnaireScene: GestionnaireScene;
    let gestionnaireSkybox: GestionnaireSkybox;
    let gestionnaireVoitures: GestionnaireVoitures;

    it("Constructeur", () => {
        gestionnaireSkybox = new GestionnaireSkybox();
        gestionnaireVoitures = new GestionnaireVoitures();
        gestionnaireScene = new GestionnaireScene(gestionnaireSkybox, gestionnaireVoitures);
        expect(gestionnaireScene).toBeDefined();
    });

    it("creerScene", () => {
        gestionnaireScene.creerScene();
        expect(gestionnaireScene.children.length).toBe(NB_ENFANTS);
        expect(gestionnaireScene.voitureJoueur).toBeDefined();

    });
});
