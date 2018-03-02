import { GenSquelette } from "./genSquelette";
import * as lesConst from "./constantes";
import * as assert from "assert";

{

    const monGen: GenSquelette = new GenSquelette();
    const indiceBidon: number = 5;
    const indiceLoin: number = 8;

    describe("Tests GenSquelette", () => {

        describe("Tests initialisation", () => {

            it("test taille premier tab", () => {
                assert.equal(lesConst.TAILLE_TABLEAU, monGen["grille"].length);
            });

            for (let i: number = 0; i < lesConst.TAILLE_TABLEAU; i++) {
                it("test taille col " + i, () => {
                    assert.equal(lesConst.TAILLE_TABLEAU, monGen["grille"][i].length);
                });
            }

        });

        describe("Test prob", () => {
            it("devrait etre faux", () => {
                assert.equal(false, monGen["probabiliterDeContinuerMot"](0, -1));
            });

            it("devrait etre faux", () => {
                assert.equal(false, monGen["probabiliterDeContinuerMot"](0, lesConst.TAILLE_TABLEAU));
            });

            it("devrait toujours etre vrai si premier indice est 0", () => {
                assert.equal(true, monGen["probabiliterDeContinuerMot"](0, indiceBidon));
            });

        });

        describe("Test indicePasDansGrille", () => {
            it("devrait etre Vrai", () => {
                assert.equal(true, monGen["indicePasDansGrille"](-1));
            });

            it("devrait etre Vrai", () => {
                assert.equal(true, monGen["indicePasDansGrille"](lesConst.TAILLE_TABLEAU));
            });

            it("devrait etre Faux", () => {
                assert.equal(false, monGen["indicePasDansGrille"](indiceBidon));
            });
        });

        describe("Test trouverIndexFinDeMot", () => {

            it("Retourne -1 si param est neg", () => {
                assert.equal(-1, monGen["trouverIndexFinDeMot"](-1));
            });

            it("Retourne -1 si param est > TAILLE", () => {
                assert.equal(-1, monGen["trouverIndexFinDeMot"](lesConst.TAILLE_TABLEAU));
            });

            let flagVerif: boolean = false;
            if (monGen["trouverIndexFinDeMot"](0) < lesConst.TAILLE_TABLEAU ||
                monGen["trouverIndexFinDeMot"](0) >= 0) {
                flagVerif = true;
            }

            it("devrait toujours etre entre indice (+2) en param et TAILLE_TABLEAU", () => {
                assert.equal(true, flagVerif);
            });

            flagVerif = false;
            if (monGen["trouverIndexFinDeMot"](indiceBidon) < lesConst.TAILLE_TABLEAU ||
                monGen["trouverIndexFinDeMot"](indiceBidon) >= indiceBidon) {
                flagVerif = true;
            }

            it("devrait toujours etre entre indice (+2) en param et TAILLE_TABLEAU", () => {
                assert.equal(true, flagVerif);
            });

            flagVerif = false;
            if (monGen["trouverIndexFinDeMot"](indiceLoin) < lesConst.TAILLE_TABLEAU ||
                monGen["trouverIndexFinDeMot"](indiceLoin) >= indiceLoin) {
                flagVerif = true;
            }

            it("sePasseQuoiIci", () => {
                assert.equal(true, flagVerif);
            });
        });

    });

}
