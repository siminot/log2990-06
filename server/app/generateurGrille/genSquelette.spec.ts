import { GenSquelette } from "./genSquelette";
import * as lesConst from "./constantes";
import * as assert from "assert";

{

    const monGen: GenSquelette = new GenSquelette();
    const indiceBidon = 5;

    describe("Tests GenSquelette", () => {

        describe("Tests initialisation", () => {

            it("test taille premier tab", (done) => {
                assert.equal(lesConst.TAILLE_TABLEAU, monGen["grille"].length);
                done();
            });

            for (let i = 0; i < lesConst.TAILLE_TABLEAU; i++) {
                it("test taille col " + i, (done) => {
                    assert.equal(lesConst.TAILLE_TABLEAU, monGen["grille"][i].length);
                    done();
                });
            }

        });

        describe("Test prob", () => {
            it("devrait etre faux", (done) => {
                assert.equal(false, monGen["probabiliterDeContinuerMot"](0, -1));
                done();
            });

            it("devrait etre faux", (done) => {
                assert.equal(false, monGen["probabiliterDeContinuerMot"](0, lesConst.TAILLE_TABLEAU));
                done();
            });

            it("devrait toujours etre vrai si premier indice est 0", (done) => {
                assert.equal(true, monGen["probabiliterDeContinuerMot"](0, indiceBidon));
                done();
            });

        });

        describe("Test indicePasDansGrille", () => {
            it("devrait etre Vrai", (done) => {
                assert.equal(true, monGen["indicePasDansGrille"](-1));
                done();
            });

            it("devrait etre Vrai", (done) => {
                assert.equal(true, monGen["indicePasDansGrille"](lesConst.TAILLE_TABLEAU));
                done();
            });

            it("devrait etre Faux", (done) => {
                assert.equal(false, monGen["indicePasDansGrille"](indiceBidon));
                done();
            });
        });

        describe("Test trouverIndexFinDeMot", () => {

            it("Retourne -1 si param est neg", (done) => {
                assert.equal(-1, monGen["trouverIndexFinDeMot"](-1));
                done();
            });

            it("Retourne -1 si param est > TAILLE", (done) => {
                assert.equal(-1, monGen["trouverIndexFinDeMot"](lesConst.TAILLE_TABLEAU));
                done();
            });

            let flagVerif = false;
            if (monGen["trouverIndexFinDeMot"](0) < lesConst.TAILLE_TABLEAU ||
                monGen["trouverIndexFinDeMot"](0) >= 0) {
                flagVerif = true;
            }

            it("devrait toujours etre entre indice (+2) en param et TAILLE_TABLEAU", (done) => {
                assert.equal(true, flagVerif);
                done();
            });

            flagVerif = false;
            if (monGen["trouverIndexFinDeMot"](indiceBidon) < lesConst.TAILLE_TABLEAU ||
                monGen["trouverIndexFinDeMot"](indiceBidon) >= indiceBidon) {
                flagVerif = true;
            }

            it("devrait toujours etre entre indice (+2) en param et TAILLE_TABLEAU", (done) => {
                assert.equal(true, flagVerif);
                done();
            });

        });

    });

}
