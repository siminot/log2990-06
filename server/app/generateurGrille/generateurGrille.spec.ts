import { GenerateurGrille } from "./generateurGrille";
import * as assert from "assert";
import * as WebRequest from "web-request";
import { Mot } from "./mot";

describe("Tests GenerateurGrille", () => {

    describe("- tests du constructeur", () => {

        it("bon fonctionnement du constructeur", (done: MochaDone) => {
            assert.ok(new GenerateurGrille);
            done();
        });

        const generateurGrille: GenerateurGrille = new GenerateurGrille();

        it("le constructeur cree bien des options", (done: MochaDone) => {
            assert.ok(generateurGrille["optionsPartie"]);
            done();
        });

        const TEMPS_MAXIMAL: number = 30000; // une grille doit etre retournee en moins de 30 secondes
        it("requeteGrille fonctionne (le serveur doit fonctionner)", async () => {
            const URL_TEST: string = "http://localhost:3000/grille/facile";
            const data: Mot = await WebRequest.json<Mot>(URL_TEST);
            assert.ok(data);

        }).timeout(TEMPS_MAXIMAL);
    });
});
