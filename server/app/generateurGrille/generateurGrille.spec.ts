import { GenerateurGrille } from "./generateurGrille";
import { Mockword } from "./../../../common/mockObject/mockWord";
import { GenerateurSquelette } from "./generateurSquelette";
import * as assert from "assert";

{

    const genTest: GenerateurGrille = new GenerateurGrille;

    describe("Test GenerateurGrille", () => {

        describe( "", () => {
            
        });

    });

    describe("tests generation des mots", () => {

        let motTest: Mockword = new Mockword(false, 3, 1, 0);

        it("Le premier mot horizontal est bien de 3 lettres", (done) => {
            assert.equal(genTest.genererMot(1, 0, false).getLongueur, motTest.getLongueur);
            done();
        });

        motTest = new Mockword(true, 3, 0, 1);

        it("Le mot vertical a la position (0, 1) est bien de 3 lettres", (done) => {
            assert.equal(genTest.genererMot(0, 1, true).getLongueur, motTest.getLongueur);
            done();
        });

    });

}
