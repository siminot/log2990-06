import { Mot, TypeMot } from "./Mot";
import { Definition } from "./Definition";
import { MotAPI } from "./MotAPI";
import * as assert from "assert";

{
    describe("Objet Definition", () => {
        describe("Methode contient(mot)", () => {
            const MOT = "test";
            const TYPEMOT = TypeMot.Nom;

            it("détection au début de la définition", () => {
                const DEF = "n\tTest de quelque chose";
                const DEFINITION = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("détection au milieu de la définition", () => {
                const DEF = "n\tAction d'effectuer un test ou un essai";
                const DEFINITION = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("détection à la fin de la définition", () => {
                const DEF = "n\tAction de faire un test";
                const DEFINITION = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("détection d'un mot similaire en début de mot", () => {
                const DEF = "n\tAction de tester une fonction";
                const DEFINITION = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("détection d'un mot similaire en milieu de mot", () => {
                const DEF = "n\tAction d'attester quelqu'un";
                const DEFINITION = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("détection d'un mot similaire en fin de mot", () => {
                const DEF = "n\tJ'attest ce que tu dis avec une faute";
                const DEFINITION = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("aucun mot détecté", () => {
                const typeMot = TypeMot.Nom;
                const DEF = "n\tAction d'essayer quelque chose";
                const DEFINITION = new Definition(typeMot, DEF);

                assert.equal(DEFINITION.contient(MOT), false);
            });
        });

        describe("Methode estNomOuVerbe()", () => {
            const MOT = "test";
            const DEF = "n\tTest de quelque chose";

            it("détection pour un nom", () => {
                const TYPEMOT = TypeMot.Nom;
                const DEFINITION = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.estNomOuVerbe(), true);
            });

            it("détection pour un verbe", () => {
                const TYPEMOT = TypeMot.Verbe;
                const DEFINITION = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.estNomOuVerbe(), true);
            });

            it("non détecté pour un adjectif", () => {
                const TYPEMOT = TypeMot.Adjectif;
                const DEFINITION = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.estNomOuVerbe(), false);
            });

            it("non détecté pour un adverbe", () => {
                const TYPEMOT = TypeMot.Adverbe;
                const DEFINITION = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.estNomOuVerbe(), false);
            });
        });
    });
}
