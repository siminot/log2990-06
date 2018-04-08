import * as assert from "assert";
// import * as WebRequest from "web-request";
import { BaseDonneesCourse } from "./baseDonneesCourse";

describe("Tests base de données du jeu de course", () => {
    describe("- tests du constructeur", () => {
        it("bon fonctionnement du constructeur", () => {
            assert.ok(new BaseDonneesCourse);
        });
    });
});
