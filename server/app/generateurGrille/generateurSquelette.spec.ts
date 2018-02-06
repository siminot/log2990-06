import * as assert from "assert";
import { NOIR, VIDE } from "./constantes";
import { GenerateurSquelette } from "./generateurSquelette";

{
    const TAILLE_GRILLE = 10;
    const POURCENTAGE_CASES_NOIRES = 0.25;
    const genSquelette: GenerateurSquelette = new GenerateurSquelette(TAILLE_GRILLE, POURCENTAGE_CASES_NOIRES);
    /* tslint:disable: no-magic-numbers */

    describe("Tests du squelette", () => {

        const grille = genSquelette.getSqueletteGrille();

        it ("Le constructeur du squelette devrait fonctionner", (done) => {
            assert.ok(new GenerateurSquelette(TAILLE_GRILLE, POURCENTAGE_CASES_NOIRES));
            done();
        });

        it ("Le squelette devrait etre de taille 10x10", (done) => {
            assert.equal(genSquelette.getTailleGrille(), TAILLE_GRILLE);
            done();
        });

        it ("Le squelette devrait etre rempli de case noire et blanches", (done) => {
            let correct = true;
            for (let i = 0; i < TAILLE_GRILLE; ++i) {
                for (let j = 0; j < TAILLE_GRILLE; ++j) {
                    if (grille[j][i] !== VIDE && grille[j][i] !== NOIR) {
                        correct = false;
                    }
                }
            }
            assert(correct);
            done();
        });

        it ("Le squelette devrait contenir 0.25*10*10 = 25 cases noires", (done) => {
            let compteurCasesNoires = 0;
            for (let i = 0; i < TAILLE_GRILLE; ++i) {
                for (let j = 0; j < TAILLE_GRILLE; ++j) {
                    if (grille[j][i] === NOIR) {
                        compteurCasesNoires++;
                    }
                }
            }
            assert.equal(compteurCasesNoires, POURCENTAGE_CASES_NOIRES * TAILLE_GRILLE * TAILLE_GRILLE);
            done();
        });

        it ("Il ne devrait pas avoir un espace vide entoure de cases noires(1)", (done) => {
            let estCorrect = true;
            for (let i = 1; i < TAILLE_GRILLE - 1; ++i) {
                for (let j = 1; j < TAILLE_GRILLE - 1; ++j) {
                    if (grille[j - 1][i] === NOIR && grille[j][i - 1] === NOIR
                        && grille[j + 1][i] === NOIR && grille[j][i + 1] === NOIR
                        && grille[j][i] === VIDE) {
                        estCorrect = false;
                    }
                }
            }
            assert(estCorrect);
            done();
        });

        it ("Il ne devrait pas avoir un espace vide entoure de cases noires(2)", (done) => {
            let estCorrect = true;
            if (grille[0][0] === VIDE && grille[0][1] === NOIR && grille[1][0] === NOIR) {
                estCorrect = false;
            }
            assert(estCorrect);
            done();
        });

        it ("Il ne devrait pas avoir un espace vide entoure de cases noires(3)", (done) => {
            let estCorrect = true;
            if (grille[0][TAILLE_GRILLE - 1] === VIDE && grille[0][TAILLE_GRILLE - 2] === NOIR
                && grille[1][TAILLE_GRILLE - 1] === NOIR) {
                estCorrect = false;
            }
            assert(estCorrect);
            done();
        });

        it ("Il ne devrait pas avoir un espace vide entoure de cases noires(4)", (done) => {
            let estCorrect = true;
            if (grille[TAILLE_GRILLE - 1][0] === VIDE && grille[TAILLE_GRILLE - 2][0] === NOIR
                && grille[TAILLE_GRILLE - 1][1] === NOIR) {
                estCorrect = false;
            }
            assert(estCorrect);
            done();
        });

        it ("Il ne devrait pas avoir un espace vide entoure de cases noires(5)", (done) => {
            let estCorrect = true;
            if (grille[TAILLE_GRILLE - 1][TAILLE_GRILLE - 1] === VIDE && grille[TAILLE_GRILLE - 2][TAILLE_GRILLE - 1] === NOIR
                && grille[TAILLE_GRILLE - 1][TAILLE_GRILLE - 2] === NOIR) {
                estCorrect = false;
            }
            assert(estCorrect);
            done();
        });

        it ("Il ne devrait pas avoir un espace vide entoure de cases noires(6)", (done) => {
            let estCorrect = true;
            for (let i = 1; i < TAILLE_GRILLE - 1; ++i) {
                if (grille[0][i] === VIDE && grille[1][i] === NOIR
                    && grille[0][i + 1] === NOIR && grille[0][i - 1] === NOIR) {
                    estCorrect = false;
                }
            }
            assert(estCorrect);
            done();
        });

        it ("Il ne devrait pas avoir un espace vide entoure de cases noires(7)", (done) => {
            let estCorrect = true;
            for (let i = 1; i < TAILLE_GRILLE - 1; ++i) {
                if (grille[TAILLE_GRILLE - 1][i] === VIDE && grille[TAILLE_GRILLE - 2][i] === NOIR
                    && grille[TAILLE_GRILLE - 1][i + 1] === NOIR && grille[TAILLE_GRILLE - 1][i - 1] === NOIR) {
                    estCorrect = false;
                }
            }
            assert(estCorrect);
            done();
        });

        it ("Il ne devrait pas avoir un espace vide entoure de cases noires(8)", (done) => {
            let estCorrect = true;
            for (let j = 1; j < TAILLE_GRILLE - 1; ++j) {
                if (grille[j][0] === VIDE && grille[j][1] === NOIR
                    && grille[j - 1][0] === NOIR && grille[j + 1][0] === NOIR) {
                    estCorrect = false;
                }
            }
            assert(estCorrect);
            done();
        });

        it ("Il ne devrait pas avoir un espace vide entoure de cases noires(9)", (done) => {
            let estCorrect = true;
            for (let j = 1; j < TAILLE_GRILLE - 1; ++j) {
                if (grille[j][TAILLE_GRILLE - 1] === VIDE && grille[j][TAILLE_GRILLE - 2] === NOIR
                    && grille[j - 1][TAILLE_GRILLE - 1] === NOIR && grille[j + 1][TAILLE_GRILLE - 1] === NOIR) {
                    estCorrect = false;
                }
            }
            assert(estCorrect);
            done();
        });

    });

}
