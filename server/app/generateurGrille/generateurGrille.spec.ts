import { GenerateurGrille } from "./generateurGrille";
import * as assert from "assert";
import * as WebRequest from "web-request";
import { Mockword } from "../../../common/mockObject/mockWord";

describe("Tests GenerateurGrille", () => {

    describe("- tests du constructeur", () => {

        it("bon fonctionnement du constructeur", (done) => {
            assert.ok(new GenerateurGrille);
            done();
        });

        const generateurGrille = new GenerateurGrille();

        it("le constructeur cree bien des options", (done) => {
            assert.ok(generateurGrille["optionsPartie"]);
            done();
        });

        const TEMPS_MAXIMAL = 30000; // une grille doit etre retournee en moins de 30 secondes
        it("requeteGrille fonctionne (le serveur doit fonctionner)", async () => {
            const URL_TEST = "http://localhost:3000/grille/facile";
            const data: Mockword = await WebRequest.json<Mockword>(URL_TEST);
            assert.ok(data);

        }).timeout(TEMPS_MAXIMAL);
    });
});
