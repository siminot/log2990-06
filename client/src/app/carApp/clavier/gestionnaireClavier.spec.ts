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

    describe("Touches appuyees", () => {
        it("Zoomer", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keydown", {
                "keyCode": ZOOM_IN
            });
            spyOn(gestionnaireClavier["gestionnaireCamera"], "zoomer");
            gestionnaireClavier.toucheAppuyee(touche);
            expect(gestionnaireClavier["gestionnaireCamera"].zoomer).toHaveBeenCalled();
        });

        it("Dezoomer", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keydown", {
                "keyCode": ZOOM_OUT
            });
            spyOn(gestionnaireClavier["gestionnaireCamera"], "dezoomer");
            gestionnaireClavier.toucheAppuyee(touche);
            expect(gestionnaireClavier["gestionnaireCamera"].dezoomer).toHaveBeenCalled();
        });

        it("Accelerer", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keydown", {
                "keyCode": ACCELERATEUR
            });
            spyOn(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur, "accelerer");
            gestionnaireClavier.toucheAppuyee(touche);
            expect(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur.accelerer).toHaveBeenCalled();
        });

        it("Gauche", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keydown", {
                "keyCode": DIRECTION_GAUCHE
            });
            spyOn(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur, "virerGauche");
            gestionnaireClavier.toucheAppuyee(touche);
            expect(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur.virerGauche).toHaveBeenCalled();
        });

        it("Droite", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keydown", {
                "keyCode": DIRECTION_DROITE
            });
            spyOn(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur, "virerDroite");
            gestionnaireClavier.toucheAppuyee(touche);
            expect(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur.virerDroite).toHaveBeenCalled();
        });

        it("Freiner", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keydown", {
                "keyCode": FREIN
            });
            spyOn(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur, "freiner");
            gestionnaireClavier.toucheAppuyee(touche);
            expect(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur.freiner).toHaveBeenCalled();
        });
    });

    describe("Touches relâchees", () => {
        it("Changer de camera", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keyup", {
                "keyCode": CHANGER_VUE
            });
            spyOn(gestionnaireClavier["gestionnaireCamera"], "changerCamera");
            gestionnaireClavier.toucheRelevee(touche);
            expect(gestionnaireClavier["gestionnaireCamera"].changerCamera).toHaveBeenCalled();
        });

        it("Changer heure de la journee", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keyup", {
                "keyCode": CHANGER_HEURE_JOURNEE
            });
            spyOn(gestionnaireClavier["gestionnaireScene"], "changerTempsJournee");
            gestionnaireClavier.toucheRelevee(touche);
            expect(gestionnaireClavier["gestionnaireScene"].changerTempsJournee).toHaveBeenCalled();
        });

        it("Changer le decor", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keyup", {
                "keyCode": CHANGER_DECOR
            });
            spyOn(gestionnaireClavier["gestionnaireScene"], "changerDecor");
            gestionnaireClavier.toucheRelevee(touche);
            expect(gestionnaireClavier["gestionnaireScene"].changerDecor).toHaveBeenCalled();
        });

        it("Accelerer", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keyup", {
                "keyCode": ACCELERATEUR
            });
            spyOn(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur, "relacherAccelerateur");
            gestionnaireClavier.toucheRelevee(touche);
            expect(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur.relacherAccelerateur).toHaveBeenCalled();
        });

        it("Gauche", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keyup", {
                "keyCode": DIRECTION_GAUCHE
            });
            spyOn(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur, "relacherVolant");
            gestionnaireClavier.toucheRelevee(touche);
            expect(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur.relacherVolant).toHaveBeenCalled();
        });

        it("Droite", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keyup", {
                "keyCode": DIRECTION_DROITE
            });
            spyOn(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur, "relacherVolant");
            gestionnaireClavier.toucheRelevee(touche);
            expect(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur.relacherVolant).toHaveBeenCalled();
        });

        it("Freiner", () => {
            const touche: KeyboardEvent = new KeyboardEvent("keyup", {
                "keyCode": FREIN
            });
            spyOn(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur, "relacherFreins");
            gestionnaireClavier.toucheRelevee(touche);
            expect(gestionnaireClavier["gestionnaireVoitures"].voitureJoueur.relacherFreins).toHaveBeenCalled();
        });
    });
});
