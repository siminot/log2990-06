import { GenerateurGrille } from "./generateurGrille";
import { Mockword } from "./../../../common/mockObject/mockWord";

{

    const genTest: GenerateurGrille = new GenerateurGrille;
    const assert = require("assert");

   // const expect = require("expect");

    describe("tests generation des cases noires", () => {

        it("fait bien 50% cases, soit 8 cases", (done) => {
            assert.equal(genTest.initCasesNoires(0.5), 8);
            done();
        });

        // it('fait bien 100% cases, soit 16 cases', (done) => {
        //     assert.equal(genTest.initCasesNoires(1), 16);
        //     done();
        // });

        it("fait bien 0% cases, soit 0 cases", (done) => {
            assert.equal(genTest.initCasesNoires(0), 0);
            done();
        });

        it("Doit retourner NULL avec une entree negative", (done) => {
            assert.equal(genTest.initCasesNoires(-10), null);
            done();
        });

        it("Doit retourner NULL avec une entree superieure a 1", (done) => {
            assert.equal(genTest.initCasesNoires(2), null);
            done();
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