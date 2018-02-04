import * as assert from "assert";
import { } from "./constantes";
import { GenerateurSquelette } from "./generateurSquelette";


{
    const genSquelette: GenerateurSquelette = new GenerateurSquelette;

    describe("Tests du squelette", () => {

        const NOUVELLE_TAILLE = 6;

        it ("Devrait modifier la taille avec une nouvelle taille de 6 X 6", (done) => {
            assert.equal(genSquelette.modifierLaTaille(NOUVELLE_TAILLE), NOUVELLE_TAILLE);
            done();
        });

    });

}