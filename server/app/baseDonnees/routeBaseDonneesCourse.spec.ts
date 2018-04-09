/*
    Tests des routes.
    Le serveur doit être en marche pour que les tests fonctionnent.
*/
import * as assert from "assert";
import * as WebRequest from "web-request";
import { PisteBD } from "../../../client/src/app/carApp/piste/IPisteBD";

// import { RouteBaseDonneesCourse } from "./routeBaseDonneesCourse";
// import { ServiceWeb } from "../serviceweb";
// import { PISTE1 } from "../../../client/src/app/carApp/piste/pisteTest";

const URL_SERVICE: string = "http://localhost:3000/apipistes/";
const URL_AJOUTER: string = URL_SERVICE + "ajouter/";
// const URL_MODIFIER: string = URL_SERVICE + "modifier/";
// const URL_SUPPRIMER: string = URL_SERVICE + "supprimer/";

{
    describe("Tests sur les routes de la base de données.", () => {
        describe("Accéder aux routes (serveur doit rouler pour que ca fonctionne)", async () => {
            describe("Obtention de pistes.", () => {
                it("Doit retourner un tableau non-vide", async () => {
                    const PISTES: PisteBD[] = await WebRequest.json<PisteBD[]>(URL_SERVICE);
                    assert.notEqual(PISTES.length, 0);
                });

                it("Reception de pistes.", async () => {
                    const DATA: PisteBD[] = await WebRequest.json<PisteBD[]>(URL_SERVICE);
                    assert.ok(DATA);
                });
            });
        });
    });
}
