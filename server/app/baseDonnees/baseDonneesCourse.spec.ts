import * as assert from "assert";
import { BaseDonneesCourse } from "./baseDonneesCourse";

describe("Tests base de données du jeu de course", () => {
    describe("Tests du constructeur", () => {
        it ("bon fonctionnement du constructeur", (done: MochaDone) => {
            assert.ok(new BaseDonneesCourse);
            done();
        });

        const baseDonneesCourse: BaseDonneesCourse = new BaseDonneesCourse();

        it ("Le constructeur crée bien le schéma de piste.", (done: MochaDone) => {
            assert.ok(baseDonneesCourse["schemaPiste"]);
            done();
        });

        it ("Le constructeur crée bien Mongoose.", (done: MochaDone) => {
            assert.ok(baseDonneesCourse["mongoose"]);
            done();
        });

        it ("Le constructeur crée bien le modèle de piste.", (done: MochaDone) => {
            assert.ok(baseDonneesCourse["modelPiste"]);
            done();
        });
    });
});
