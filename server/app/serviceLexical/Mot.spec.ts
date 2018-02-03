import { Mot, TypeMot, Frequence } from "./Mot";
import { Definition } from "./Definition";
import { MotAPI } from "./MotAPI";
import * as assert from "assert";

{
    // const expect = require("expect");

    // MotAPI pour test
    const WORD = "test";
    const SCORE = 1000;
    const FREQUENCE_MEDIANE = 80;
    const DEFINITION1 = "n\tAction de faire un test";
    const TAGS: Array<string> = ["f:" + FREQUENCE_MEDIANE];
    const DEFS: Array<string> = [DEFINITION1];
    const MOTAPI: MotAPI = { word : WORD, score : SCORE, tags : TAGS, defs : DEFS };

    describe("Objet Mot", () => {
        describe("Méthode possedeDefinition()", () => {
            it("détection de l'existence de définition", () => {
                assert.equal(new Mot(MOTAPI).possedeDefinition(), true);
            });

            it("détection de l'inexistence de définition", () => {
                const MOT_TEST = new Mot({ word : WORD, score : SCORE, tags : TAGS, defs : undefined });
                assert.equal(MOT_TEST.possedeDefinition(), false);
            });
        });

        describe("Méthode obtenirFrequence()", () => {
            it("détection d'un mot commun", () => {
                const FREQUENCE_TEST = FREQUENCE_MEDIANE + 1;
                const MOT_TEST = new Mot({ word : WORD, score : SCORE, tags : ["f:" + FREQUENCE_TEST], defs : DEFS });
                assert.equal(MOT_TEST.obtenirFrequence(), Frequence.NonCommun);
            });

            it("détection d'un mot non commun", () => {
                const FREQUENCE_TEST = FREQUENCE_MEDIANE - 1;
                const MOT_TEST = new Mot({ word : WORD, score : SCORE, tags : ["f:" + FREQUENCE_TEST], defs : DEFS });
                assert.equal(MOT_TEST.obtenirFrequence(), Frequence.NonCommun);
            });
        });

        describe("Méthode contientCaractereInvalide()", () => {
            it("détection d'un espace", () => {
                const MOT = "up to";
                const MOTAPI: MotAPI = { word : MOT, score : SCORE, tags : TAGS, defs : DEFS };
                const MOT_TEST = new Mot(MOTAPI);
                assert.equal(MOT_TEST.contientCaractereInvalide(), true);
            });

            it("détection d'un tiret", () => {
                const MOT = "up-to-date";
                const MOTAPI: MotAPI = { word : MOT, score : SCORE, tags : TAGS, defs : DEFS };
                const MOT_TEST = new Mot(MOTAPI);
                assert.equal(MOT_TEST.contientCaractereInvalide(), true);
            });

            it("détection d'un apostrophe", () => {
                const MOT = "j'ai";
                const MOTAPI: MotAPI = { word : MOT, score : SCORE, tags : TAGS, defs : DEFS };
                const MOT_TEST = new Mot(MOTAPI);
                assert.equal(MOT_TEST.contientCaractereInvalide(), true);
            });

            it("détection d'un caractère accentué", () => {
                const MOT = "caractère";
                const MOTAPI: MotAPI = { word : MOT, score : SCORE, tags : TAGS, defs : DEFS };
                const MOT_TEST = new Mot(MOTAPI);
                assert.equal(MOT_TEST.contientCaractereInvalide(), true);
            });

            it("détection d'aucun caractere invalide", () => {
                const MOT = "test";
                const MOTAPI: MotAPI = { word : MOT, score : SCORE, tags : TAGS, defs : DEFS };
                const MOT_TEST = new Mot(MOTAPI);
                assert.equal(MOT_TEST.contientCaractereInvalide(), false);
            });
        });
    });
}
