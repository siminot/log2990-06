import { GenerateurGrille } from "./generateurGrille";
import * as assert from "assert";
import * as WebRequest from "web-request";
import { Mockword } from "../../../common/mockObject/mockWord";

// const genTest: GenerateurGrille = new GenerateurGrille();

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

        const TEMPS_MAXIMAL = 30000;
        it("requeteGrille fonctionne (le serveur doit fonctionner)", async (done) => {
            const URL_TEST = "http://localhost:3000/grille/facile";
            const data = await WebRequest.json(URL_TEST);
            assert.ok(data);
            done();

        }).timeout(TEMPS_MAXIMAL);
    });
});
