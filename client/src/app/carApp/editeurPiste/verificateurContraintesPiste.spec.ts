import { VerificateurContraintesPiste, LONGUEUR_MINIMALE } from "./verificateurContraintesPiste";
import { PisteEdition } from "../piste/pisteEdition";
import { Point } from "../elementsGeometrie/point";

let verificateur: VerificateurContraintesPiste;
let piste: PisteEdition;

const POINT1: Point = new Point(0, 0);
const POINT2: Point = new Point(LONGUEUR_MINIMALE - 1, 0);
const POINT3: Point = new Point(LONGUEUR_MINIMALE, LONGUEUR_MINIMALE);
const POINT4: Point = new Point(LONGUEUR_MINIMALE, -LONGUEUR_MINIMALE);
const POINT5: Point = new Point(0, -LONGUEUR_MINIMALE);
const POINT6: Point = new Point(0, LONGUEUR_MINIMALE);

describe("VerificateurContraintesPiste", () => {

    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            piste = new PisteEdition();
            verificateur = piste["verificateurPiste"];
            expect(verificateur).toBeTruthy();
        });
    });

    describe("Simulation d'ajout de points", () => {

        beforeEach(() => {
            piste = new PisteEdition();
            verificateur = piste["verificateurPiste"];
        });

        it("Premier point ne brise aucune contrainte", () => {
            piste.ajouterPoint(POINT1);
            expect(verificateur.pisteRespecteContraintes).toBeTruthy();
        });

        it("Deuxieme point brise contrainte de longueur", () => {
            piste.ajouterPoint(POINT1);
            expect(verificateur.pisteRespecteContraintes).toBeTruthy();
            piste.ajouterPoint(POINT2);
            expect(verificateur.pisteRespecteContraintes).toBeFalsy();
        });

        it("Deuxieme point ne brise pas de contrainte de longueur", () => {
            piste.ajouterPoint(POINT1);
            piste.ajouterPoint(POINT3);
            expect(verificateur.pisteRespecteContraintes).toBeTruthy();
        });

        it("Troisieme point ne brise pas contrainte d'angle", () => {
            piste.ajouterPoint(POINT1);
            piste.ajouterPoint(POINT3);
            piste.ajouterPoint(POINT4);
            expect(verificateur.pisteRespecteContraintes).toBeTruthy();
        });

        it("Troisieme point brise contrainte d'angle", () => {
            piste.ajouterPoint(POINT1);
            piste.ajouterPoint(POINT3);
            expect(verificateur.pisteRespecteContraintes).toBeTruthy();
            piste.ajouterPoint(POINT5);
            expect(verificateur.pisteRespecteContraintes).toBeFalsy();
        });

        it("Quatrieme brise contrainte de croisement", () => {
            piste.ajouterPoint(POINT1);
            piste.ajouterPoint(POINT3);
            piste.ajouterPoint(POINT4);
            expect(verificateur.pisteRespecteContraintes).toBeTruthy();
            piste.ajouterPoint(POINT6);
            expect(verificateur.pisteRespecteContraintes).toBeFalsy();
        });
    });
});
