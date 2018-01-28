import { GenerateurGrille } from "./../crosswords/generateurGrille/generateurGrille";

{

    let genTest: GenerateurGrille = new GenerateurGrille;
    const assert = require('assert');

    describe("tests generation des cases noires", () => {

        it('fait bien 50% cases, soit 8 cases', (done) => {
            assert.equal(genTest.initCasesNoires(0.5), 8);
            done();
        });

        // it('fait bien 100% cases, soit 16 cases', (done) => {
        //     assert.equal(genTest.initCasesNoires(1), 16);
        //     done();
        // });

        it('fait bien 0% cases, soit 0 cases', (done) => {
            assert.equal(genTest.initCasesNoires(0), 0);
            done();
        });

        it('Doit retourner NULL avec une entree negative', (done) => {
            assert.equal(genTest.initCasesNoires(-10), null);
            done();
        });

        it('Doit retourner NULL avec une entree superieure a 1', (done) => {
            assert.equal(genTest.initCasesNoires(2), null);
            done();
        });

  });

}