import * as assert from "assert";
import { NOIR, VIDE } from "./constantes";
import { GenerateurSquelette } from "./generateurSquelette";

{
    const TAILLE_GRILLE = 10;
    const POURCENTAGE_CASES_NOIRES = 0.25;
    const genSquelette: GenerateurSquelette = new GenerateurSquelette(TAILLE_GRILLE, POURCENTAGE_CASES_NOIRES);
    const expect = require("expect");

    describe("Tests du squelette", () => {

        const TAILLE_10 = 10;

        it ("Le squelette devrait etre de taille 10x10", (done) => {
            assert.equal(genSquelette.getTailleGrille(), TAILLE_10);
        });

        it ("Le squelette devrait etre rempli de case noire et blanches", (done) => {
            const grille = genSquelette.getSqueletteGrille();
            let correct = true;
            for (let i = 0; i < TAILLE_10; ++i) {
                for (let j = 0; j < TAILLE_10; ++j) {
                    if (grille[j][i] !== VIDE && grille[j][i] !== NOIR) {
                        correct = false;
                    }
                }
            }
            assert(correct);
        });
    });

}
