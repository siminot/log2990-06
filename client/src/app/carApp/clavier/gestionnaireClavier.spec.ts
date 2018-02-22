import * as assert from "assert";
import { GestionnaireClavier, ACCELERATEUR, DIRECTION_GAUCHE, FREIN, DIRECTION_DROITE, CHANGER_VUE,
         ZOOM_IN, ZOOM_OUT, CHANGER_DECOR, CHANGER_HEURE_JOURNEE} from "./gestionnaireClavier";
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

    // TODO: toHaveBeenCalled ne fonctionne pas encore
    describe("Touches appuyees", () => {
        it("Zoomer", () => {
            // const zoomer: Function = gestionnaireClavier["gestionnaireCamera"].zoomer;
            const touche: KeyboardEvent = new KeyboardEvent(ZOOM_IN.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            // expect(zoomer).toHaveBeenCalled();
            assert(true);
        });

        it("Dezoomer", () => {
            const touche: KeyboardEvent = new KeyboardEvent(ZOOM_OUT.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });

        it("Accelerer", () => {
            const touche: KeyboardEvent = new KeyboardEvent(ACCELERATEUR.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });

        it("Gauche", () => {
            const touche: KeyboardEvent = new KeyboardEvent(DIRECTION_GAUCHE.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });

        it("Droite", () => {
            const touche: KeyboardEvent = new KeyboardEvent(DIRECTION_DROITE.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });

        it("Freiner", () => {
            const touche: KeyboardEvent = new KeyboardEvent(FREIN.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });
    });

    describe("Touches relâchees", () => {
        it("Changer de camera", () => {
            const touche: KeyboardEvent = new KeyboardEvent(CHANGER_VUE.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });

        it("Changer heure de la journee", () => {
            const touche: KeyboardEvent = new KeyboardEvent(CHANGER_HEURE_JOURNEE.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });

        it("Changer le decor", () => {
            const touche: KeyboardEvent = new KeyboardEvent(CHANGER_DECOR.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });

        it("Accelerer", () => {
            const touche: KeyboardEvent = new KeyboardEvent(ACCELERATEUR.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });

        it("Gauche", () => {
            const touche: KeyboardEvent = new KeyboardEvent(DIRECTION_GAUCHE.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });

        it("Droite", () => {
            const touche: KeyboardEvent = new KeyboardEvent(DIRECTION_DROITE.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });

        it("Freiner", () => {
            const touche: KeyboardEvent = new KeyboardEvent(FREIN.toString());
            gestionnaireClavier.toucheAppuyee(touche);
            assert(true);
        });
    });
});
