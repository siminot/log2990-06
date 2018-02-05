import { Mot, TypeMot, Frequence } from "./Mot";
import { MotAPI } from "./MotAPI";
import * as assert from "assert";

{
    // const expect = require("expect");

    // MotAPI pour test
    const WORD = "test";
    const SCORE = 1000;
    const FREQUENCE_MEDIANE = 10;
    const DEFINITION1 = "n\tAction de faire un test";
    const TAGS: Array<string> = [MotAPI.MARQUEUR_FREQUENCE + FREQUENCE_MEDIANE];
    const DEFS: Array<string> = [DEFINITION1];
    const MOT_DE_API: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: DEFS };

    describe("Objet Mot", () => {
        describe("Constructeur", () => {
            describe("Methodes privées : extraireDefinitions() et creerDefinition()", () => {
                describe("Tri des types de definition", () => {
                    it("Nom", () => {
                        const DEFINITION = "n\tAction de faire un test";
                        const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: [DEFINITION] };
                        assert.equal(new Mot(MOT_TEST).definitions[0].type, TypeMot.Nom);
                    });

                    it("Verbe", () => {
                        const DEFINITION = "v\tAction de faire un test";
                        const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: [DEFINITION] };
                        assert.equal(new Mot(MOT_TEST).definitions[0].type, TypeMot.Verbe);
                    });

                    it("Adjectif", () => {
                        const DEFINITION = "adj\tAction de faire un test";
                        const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: [DEFINITION] };
                        assert.equal(new Mot(MOT_TEST).definitions[0].type, TypeMot.Adjectif);
                    });

                    it("Adverbe", () => {
                        const DEFINITION = "adv\tAction de faire un test";
                        const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: [DEFINITION] };
                        assert.equal(new Mot(MOT_TEST).definitions[0].type, TypeMot.Adverbe);
                    });

                    it("Type inconnu", () => {
                        const DEFINITION = "mauvaisType\tAction de faire un test";
                        const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: [DEFINITION] };
                        assert.equal(new Mot(MOT_TEST).definitions.length, 0);
                    });
                });
            });

            describe("Creation des définitions", () => {
                it("Aucune définition", () => {
                    const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: undefined };
                    assert.equal(new Mot(MOT_TEST).definitions, null);
                });

                it("Une seule définition", () => {
                    const DEFINITION = "n\tAction de faire un test";
                    const DEFINITIONS: string[] = [DEFINITION];
                    const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: DEFINITIONS };
                    assert.equal(new Mot(MOT_TEST).definitions.length, DEFINITIONS.length);
                });

                it("Plus d'une définition", () => {
                    const DEFINITION = "n\tAction de faire un test";
                    const DEFINITION2 = "adj\tAction de faire un autre test";
                    const DEFINITIONS: string[] = [DEFINITION, DEFINITION2];
                    const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: DEFINITIONS };
                    assert.equal(new Mot(MOT_TEST).definitions.length, DEFINITIONS.length);
                });
            });

            describe("Lecture de la fréquence", () => {
                it("Aucune fréquence reçue", () => {
                    const TAGS_TEST: Array<string> = [];
                    const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS_TEST, defs: DEFS };
                    assert.equal(new Mot(MOT_TEST).obtenirFrequence(), null);
                });

                it("Identifiant invalide", () => {
                    const TAGS_TEST: Array<string> = ["pasF:" + FREQUENCE_MEDIANE];
                    const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS_TEST, defs: DEFS };
                    assert.equal(new Mot(MOT_TEST).obtenirFrequence(), null);
                });

                it("Nombre invalide", () => {
                    const TAGS_TEST: Array<string> = [MotAPI.MARQUEUR_FREQUENCE + "pasUnNombre"];
                    const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS_TEST, defs: DEFS };
                    assert.equal(new Mot(MOT_TEST).obtenirFrequence(), null);
                });

                it("Fréquence reçue valide", () => {
                    const TAGS_TEST: Array<string> = [MotAPI.MARQUEUR_FREQUENCE + FREQUENCE_MEDIANE];
                    const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS_TEST, defs: DEFS };
                    assert.notEqual(new Mot(MOT_TEST).obtenirFrequence(), null);
                });
            });
        });

        describe("Méthode possedeDefinition()", () => {
            it("détection de l'existence de définition", () => {
                assert.equal(new Mot(MOT_DE_API).possedeDefinition(), true);
            });

            it("détection de l'inexistence de définition", () => {
                const MOT_TEST: Mot = new Mot({ word: WORD, score: SCORE, tags: TAGS, defs: undefined });
                assert.equal(MOT_TEST.possedeDefinition(), false);
            });
        });

        describe("Méthode obtenirFrequence()", () => {
            it("détection d'un mot commun", () => {
                const FREQUENCE_TEST: number = FREQUENCE_MEDIANE + 1;
                const MOT_TEST: Mot = new Mot({
                    word: WORD, score: SCORE,
                    tags: [MotAPI.MARQUEUR_FREQUENCE + FREQUENCE_TEST], defs: DEFS
                });
                assert.equal(MOT_TEST.obtenirFrequence(), Frequence.Commun);
            });

            it("détection d'un mot non commun", () => {
                const FREQUENCE_TEST: number = FREQUENCE_MEDIANE - 1;
                const MOT_TEST: Mot = new Mot({
                    word: WORD, score: SCORE,
                    tags: [MotAPI.MARQUEUR_FREQUENCE + FREQUENCE_TEST], defs: DEFS
                });
                assert.equal(MOT_TEST.obtenirFrequence(), Frequence.NonCommun);
            });
        });

        describe("Méthode contientCaractereInvalide()", () => {
            it("détection d'un espace", () => {
                const MOT = "up to";
                const MOT_API: MotAPI = { word: MOT, score: SCORE, tags: TAGS, defs: DEFS };
                const MOT_TEST: Mot = new Mot(MOT_API);
                assert.equal(MOT_TEST.contientCaractereInvalide(), true);
            });

            it("détection d'un tiret", () => {
                const MOT = "up-to-date";
                const MOT_API: MotAPI = { word: MOT, score: SCORE, tags: TAGS, defs: DEFS };
                const MOT_TEST: Mot = new Mot(MOT_API);
                assert.equal(MOT_TEST.contientCaractereInvalide(), true);
            });

            it("détection d'un apostrophe", () => {
                const MOT = "j'ai";
                const MOT_API: MotAPI = { word: MOT, score: SCORE, tags: TAGS, defs: DEFS };
                const MOT_TEST: Mot = new Mot(MOT_API);
                assert.equal(MOT_TEST.contientCaractereInvalide(), true);
            });

            it("détection d'un caractère accentué", () => {
                const MOT = "caractère";
                const MOT_API: MotAPI = { word: MOT, score: SCORE, tags: TAGS, defs: DEFS };
                const MOT_TEST: Mot = new Mot(MOT_API);
                assert.equal(MOT_TEST.contientCaractereInvalide(), true);
            });

            it("détection d'aucun caractere invalide", () => {
                const MOT = "test";
                const MOT_API: MotAPI = { word: MOT, score: SCORE, tags: TAGS, defs: DEFS };
                const MOT_TEST: Mot = new Mot(MOT_API);
                assert.equal(MOT_TEST.contientCaractereInvalide(), false);
            });
        });

        describe("Méthode obtenirDefinitionsPourJeu()", () => {
            it("Ne pas enlever les noms", () => {
                const DEFINITION: string[] = ["n\tEssayer quelque chose"];
                const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: DEFINITION };
                assert.equal(new Mot(MOT_TEST).obtenirDefinitionsPourJeu().length, DEFINITION.length);
            });

            it("Ne pas enlever les verbes", () => {
                const DEFINITION: string[] = ["v\tEssayer quelque chose"];
                const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: DEFINITION };
                assert.equal(new Mot(MOT_TEST).obtenirDefinitionsPourJeu().length, DEFINITION.length);
            });

            it("Retrait des adverbes", () => {
                const DEFINITION: string[] = ["adv\tAction d'essayer quelque chose"];
                const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: DEFINITION };
                assert.equal(new Mot(MOT_TEST).obtenirDefinitionsPourJeu().length, DEFINITION.length - 1);
            });

            it("Retrait des adjectifs", () => {
                const DEFINITION: string[] = ["adj\tAction d'essayer quelque chose"];
                const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: DEFINITION };
                assert.equal(new Mot(MOT_TEST).obtenirDefinitionsPourJeu().length, DEFINITION.length - 1);
            });

            it("Conserver les définitions ne contenant pas le mot défini", () => {
                const DEFINITION: string[] = ["n\tAction d'essayer quelque chose"];
                const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: DEFINITION };
                assert.equal(new Mot(MOT_TEST).obtenirDefinitionsPourJeu().length, DEFINITION.length);
            });

            it("Retrait des définitions contenant le mot défini", () => {
                const DEFINITION: string[] = ["n\tAction de faire un test"];
                const MOT_TEST: MotAPI = { word: WORD, score: SCORE, tags: TAGS, defs: DEFINITION };
                assert.equal(new Mot(MOT_TEST).obtenirDefinitionsPourJeu().length, DEFINITION.length - 1);
            });
        });
    });
}
