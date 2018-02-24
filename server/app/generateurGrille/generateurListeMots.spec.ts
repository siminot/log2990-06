import { Mockword } from "./../../../common/mockObject/mockWord";
import { GenerateurListeMots } from "./generateurListeMots";
import * as assert from "assert";

{

    // let listeTest: Array<Mockword> = new Array<Mockword>();

    const genListeTest: GenerateurListeMots = new GenerateurListeMots();

    let uneGrille: Array<Array<string>> = new  Array<Array<string>>();
    uneGrille = [["_", "_", "_", "_", "_"],
                 ["_", "0", "0", "_", "_"],
                 ["_", "_", "0", "_", "_"],
                 ["0", "_", "_", "0", "_"],
                 ["_", "_", "_", "0", "0"]];

    describe("Tests GenerateurListeMots", () => {

        describe("- tests generation des mots", () => {

            it("- Le constructeur du mot devrait fonctionner", (done) => {
                const LONGUEUR_MOT = 4;
                assert.ok(new Mockword(false, LONGUEUR_MOT, 0, 0), "Le constructeur cause une erreur");
                done();
            });

            it("- Devrait retourner une grille", (done) => {
                assert.ok(genListeTest.donnerUneListe(uneGrille));
                done();
            });

            // it("- Devrait faire un mot horizontal", (done) => {
            //     assert.ok(genTest.genererMot(0, 0, false));
            //     done();
            // });

            // it("- Devrait causer une erreur", (done) => {
            //     assert.throws(genTest.genererMot , /-1, 0, false/, "quoi");
            //     done();
            // });

        });

    });

}
