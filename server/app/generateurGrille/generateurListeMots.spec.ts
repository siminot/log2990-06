// import { GenerateurGrille } from "./generateurGrille";
import { Mockword } from "./../../../common/mockObject/mockWord";
import * as assert from "assert";

{

    // const genTest: GenerateurGrille = new GenerateurGrille();

    describe("Tests GenerateurGrille", () => {

        describe("- tests generation des mots", () => {

            it("- Le constructeur devrait fonctionner", (done) => {
                assert.ok(new Mockword(false, 4, 0, 0), "Le constructeur cause une erreur");
                done();
            });

        });

    });

}
