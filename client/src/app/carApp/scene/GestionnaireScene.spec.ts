import { GestionnaireScene } from "./GestionnaireScene";
import { GestionnaireSkybox } from "../skybox/gestionnaireSkybox";
import { GestionnaireVoitures, NOMBRE_AI } from "../voiture/gestionnaireVoitures";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";

const NOMBRE_ELEMENTS_SCENE: number = 4;
const NB_ENFANTS: number = NOMBRE_AI + NOMBRE_ELEMENTS_SCENE;

describe("GestionnaireScence", () => {

    let gestionnaireScene: GestionnaireScene;
    let gestionnaireSkybox: GestionnaireSkybox;
    let gestionnaireVoitures: GestionnaireVoitures;
    let gestionnaireClavier: GestionnaireClavier;

    it("Constructeur", () => {
        gestionnaireClavier = new GestionnaireClavier();
        gestionnaireSkybox = new GestionnaireSkybox();
        gestionnaireVoitures = new GestionnaireVoitures(gestionnaireClavier);
        gestionnaireScene = new GestionnaireScene(gestionnaireSkybox, gestionnaireVoitures, gestionnaireClavier);
        expect(gestionnaireScene).toBeDefined();
    });

    it("creerScene", () => {
        gestionnaireScene.creerScene();
        expect(gestionnaireScene.scene.children.length).toBe(NB_ENFANTS);
        expect(gestionnaireScene.voitureJoueur).toBeDefined();

    });
});
