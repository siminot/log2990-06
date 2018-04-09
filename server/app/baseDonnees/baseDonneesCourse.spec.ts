import * as assert from "assert";
import * as WebRequest from "web-request";
import { BaseDonneesCourse } from "./baseDonneesCourse";
import { PisteBD } from "../../../client/src/app/carApp/piste/IPisteBD";

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

    describe("Requête à la base de données.", () => {
        const baseDonneesCourse: BaseDonneesCourse = new BaseDonneesCourse();

        it ("Requête obtention des pistes fonctionne.", (done: MochaDone) => {
            const URL_TEST: string = "http://localhost:3000/apipistes/";
            const data: Promise<PisteBD[]> = WebRequest.json<PisteBD[]>(URL_TEST);
            assert.ok(data);
            done();
        });
    });

});
