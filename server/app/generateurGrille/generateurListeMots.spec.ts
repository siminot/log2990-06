import { Mockword } from "./../../../common/mockObject/mockWord";
import { GenerateurListeMots } from "./generateurListeMots";
import * as assert from "assert";

{
    // tslint:disable: no-magic-numbers
    const genListeTest: GenerateurListeMots = new GenerateurListeMots();

    const uneGrille =  [["_", "_", "_", "_", "_"],
                        ["_", "0", "0", "_", "_"],
                        ["_", "_", "0", "_", "_"],
                        ["0", "_", "_", "0", "_"],
                        ["_", "_", "_", "0", "0"]];

    describe("Tests GenerateurListeMots", () => {

        describe("- Tests generation des mots", () => {

            it("- Le constructeur du mot devrait fonctionner", (done) => {
                const LONGUEUR_MOT = 4;
                assert.ok(new Mockword(false, LONGUEUR_MOT, 0, 0), "Le constructeur cause une erreur");
                done();
            });

            it("- Devrait retourner une grille", (done) => {
                assert.ok(genListeTest.donnerUneListe(uneGrille));
                done();
            });
        });
        describe("- Tests pour une grille quelconque", () => {

            const listeMotsTest = genListeTest.donnerUneListe(uneGrille);

            it("- Devrait avoir 11 mots", (done) => {
                assert(listeMotsTest.length === 11);
                done();
            });

            it("- Devrait avoir 6 mots horizontaux", (done) => {
                let compteur = 0;
                for (const mot of listeMotsTest) {
                    if (!mot.getVertical()) {
                        compteur++;
                    }
                }
                assert(compteur === 6);
                done();
            });

            it("- Devrait avoir 5 mots verticaux", (done) => {
                let compteur = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getVertical()) {
                        compteur++;
                    }
                }
                assert(compteur === 5);
                done();
            });

            it("- Devrait avoir 0 mots de 1 lettres", (done) => {
                let compteur = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getLongueur() === 1) {
                        compteur++;
                    }
                }
                assert(compteur === 0);
                done();
            });

            it("- Devrait avoir 5 mots de 2 lettres", (done) => {
                let compteur = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getLongueur() === 2) {
                        compteur++;
                    }
                }
                assert(compteur === 5);
                done();
            });

            it("- Devrait avoir 4 mots de 3 lettres", (done) => {
                let compteur = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getLongueur() === 3) {
                        compteur++;
                    }
                }
                assert(compteur === 4);
                done();
            });

            it("- Devrait avoir 1 mot de 4 lettres", (done) => {
                let compteur = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getLongueur() === 4) {
                        compteur++;
                    }
                }
                assert(compteur === 1);
                done();
            });

            it("- Devrait avoir 0 mot de 6 lettres", (done) => {
                let compteur = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getLongueur() === 6) {
                        compteur++;
                    }
                }
                assert(compteur === 0);
                done();
            });
        });
    });

}
