import { MotGenerationGrille } from "./motGenerateurGrille";
import { GenerateurListeMots } from "./generateurListeMots";
import * as assert from "assert";

{
    // tslint:disable: no-magic-numbers
    const genListeTest: GenerateurListeMots = new GenerateurListeMots();

    const uneGrille: string[][] =  [["_", "_", "_", "_", "_"],
                                    ["_", "0", "0", "_", "_"],
                                    ["_", "_", "0", "_", "_"],
                                    ["0", "_", "_", "0", "_"],
                                    ["_", "_", "_", "0", "0"]];

    describe("Tests GenerateurListeMots", () => {

        describe("- Tests generation des mots", () => {

            it("- Le constructeur du mot devrait fonctionner", () => {
                const LONGUEUR_MOT: number = 4;
                assert.ok(new MotGenerationGrille(false, LONGUEUR_MOT, 0, 0), "Le constructeur cause une erreur");
            });

            it("- Devrait retourner une grille", () => {
                assert.ok(genListeTest.donnerUneListe(uneGrille));
            });
        });
        describe("- Tests pour une grille quelconque", () => {

            const listeMotsTest: MotGenerationGrille[] = genListeTest.donnerUneListe(uneGrille);

            it("- Devrait avoir 11 mots", () => {
                assert(listeMotsTest.length === 11);
            });

            it("- Devrait avoir 6 mots horizontaux", () => {
                let compteur: number = 0;
                for (const mot of listeMotsTest) {
                    if (!mot.getVertical()) {
                        compteur++;
                    }
                }
                assert(compteur === 6);
            });

            it("- Devrait avoir 5 mots verticaux", () => {
                let compteur: number = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getVertical()) {
                        compteur++;
                    }
                }
                assert(compteur === 5);
            });

            it("- Devrait avoir 0 mots de 1 lettres", () => {
                let compteur: number = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getLongueur() === 1) {
                        compteur++;
                    }
                }
                assert(compteur === 0);
            });

            it("- Devrait avoir 5 mots de 2 lettres", () => {
                let compteur: number = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getLongueur() === 2) {
                        compteur++;
                    }
                }
                assert(compteur === 5);
            });

            it("- Devrait avoir 4 mots de 3 lettres", () => {
                let compteur: number = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getLongueur() === 3) {
                        compteur++;
                    }
                }
                assert(compteur === 4);
            });

            it("- Devrait avoir 1 mot de 4 lettres", () => {
                let compteur: number = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getLongueur() === 4) {
                        compteur++;
                    }
                }
                assert(compteur === 1);
            });

            it("- Devrait avoir 0 mot de 6 lettres", () => {
                let compteur: number = 0;
                for (const mot of listeMotsTest) {
                    if (mot.getLongueur() === 6) {
                        compteur++;
                    }
                }
                assert(compteur === 0);
            });
        });
    });

}
