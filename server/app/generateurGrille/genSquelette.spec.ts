import { GenSquelette } from "./genSquelette";
import * as lesConst from "./constantes";
import * as assert from "assert";

{

    const monGen: GenSquelette = new GenSquelette();

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

    });

}
