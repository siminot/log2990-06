import { TypeMot } from "./Mot";
import { Definition } from "./Definition";
import * as assert from "assert";

{
    describe("Objet Definition", () => {
        describe("Methode contient(mot)", () => {
            const MOT = "test";
            const TYPEMOT: TypeMot = TypeMot.Nom;

            it("détection au début de la définition", () => {
                const DEF = "n\tTest de quelque chose";
                const DEFINITION: Definition = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("détection au milieu de la définition", () => {
                const DEF = "n\tAction d'effectuer un test ou un essai";
                const DEFINITION: Definition = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("détection à la fin de la définition", () => {
                const DEF = "n\tAction de faire un test";
                const DEFINITION: Definition = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("détection d'un mot similaire en début de mot", () => {
                const DEF = "n\tAction de tester une fonction";
                const DEFINITION: Definition = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("détection d'un mot similaire en milieu de mot", () => {
                const DEF = "n\tAction d'attester quelqu'un";
                const DEFINITION: Definition = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("détection d'un mot similaire en fin de mot", () => {
                const DEF = "n\tJ'attest ce que tu dis avec une faute";
                const DEFINITION: Definition = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.contient(MOT), true);
            });

            it("aucun mot détecté", () => {
                const typeMot: TypeMot = TypeMot.Nom;
                const DEF = "n\tAction d'essayer quelque chose";
                const DEFINITION: Definition = new Definition(typeMot, DEF);

                assert.equal(DEFINITION.contient(MOT), false);
            });
        });

        describe("Methode estNomOuVerbe()", () => {
            const DEF = "n\tTest de quelque chose";

            it("détection pour un nom", () => {
                const TYPEMOT: TypeMot = TypeMot.Nom;
                const DEFINITION: Definition = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.estNomOuVerbe(), true);
            });

            it("détection pour un verbe", () => {
                const TYPEMOT: TypeMot = TypeMot.Verbe;
                const DEFINITION: Definition = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.estNomOuVerbe(), true);
            });

            it("non détecté pour un adjectif", () => {
                const TYPEMOT: TypeMot = TypeMot.Adjectif;
                const DEFINITION: Definition = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.estNomOuVerbe(), false);
            });

            it("non détecté pour un adverbe", () => {
                const TYPEMOT: TypeMot = TypeMot.Adverbe;
                const DEFINITION: Definition = new Definition(TYPEMOT, DEF);

                assert.equal(DEFINITION.estNomOuVerbe(), false);
            });
        });
    });
}
