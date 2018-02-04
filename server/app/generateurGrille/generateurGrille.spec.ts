import { GenerateurGrille } from "./generateurGrille";
import { Mockword } from "./../../../common/mockObject/mockWord";
import * as assert from "assert";

{

    const genTest: GenerateurGrille = new GenerateurGrille();

    describe("Tests GenerateurGrille", () => {

        describe("- tests generation des mots", () => {

            it("- Le constructeur devrait fonctionner", (done) => {
                assert.ok(new Mockword(false, 4, 0, 0), "Le constructeur cause une erreur");
                done();
            });

            it("- Devrait faire un mot vertical", (done) => {
                assert.ok(genTest.genererMot(0, 0, true));
                done();
            });

            it("- Devrait faire un mot horizontal", (done) => {
                assert.ok(genTest.genererMot(0, 0, false));
                done();
            });

            it("- Devrait causer une erreur", (done) => {
                assert.throws(genTest.genererMot , /-1, 0, false/, "quoi");
                done();
            });

        });

    });

}
