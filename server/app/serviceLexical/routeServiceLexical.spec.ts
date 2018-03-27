/*
    Tests des routes.
    Le serveur doit être en marche pour que les tests fonctionnent.
*/
import * as assert from "assert";
import { RouteServiceLexical } from "./routeServiceLexical";
import { Mot } from "./Mot";
import * as WebRequest from "web-request";
import { ServiceWeb } from "../serviceweb";

const ROUTE: ServiceWeb = new RouteServiceLexical();

const URL_SERVICE_LEXICAL: string = "http://localhost:3000" + ROUTE.mainRoute;
const URL_DEFINITION: string = "/def/";
const URL_COMMUN: string = "/commun";
const URL_NONCOMMUN: string = "/noncommun";
const URL_CONTRAINTE: string = "/contrainte/";

{
    describe("routeServiceLexical", () => {
        describe("Constructeur", () => {

            it("Creation d'un service web", () => {
                assert.notEqual(RouteServiceLexical.constructor(), null || undefined);
            });
        });

        describe("Accéder aux routes (serveur doit rouler pour que ca fonctionne)", () => {
            const CONTRAINTES: string[] = ["t__", "_r_b_", "__ws", "g____r___", "h____r__"];
            const CONTRAINTE_IMPOSSIBLE: string = "dwz__";

            describe("/commun/contrainte/:contrainte", () => {
                for (const CONTRAINTE of CONTRAINTES) {
                    it("Doit retourner un tableau non-vide " + CONTRAINTE, async () => {
                        const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_CONTRAINTE + CONTRAINTE;
                        const mots: Mot[] = await WebRequest.json<Mot[]>(URL_TEST);
                        assert.notEqual(mots.length, 0);
                    });
                    it("Doit retourner des mots ayant des definitions " + CONTRAINTE, async () => {
                        const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_CONTRAINTE + CONTRAINTE;
                        const mots: Mot[] = await WebRequest.json<Mot[]>(URL_TEST);
                        for (const MOT of mots) {
                        assert.notEqual(MOT.definitions.length, 0);
                        }
                    });
                }
            });

            describe("/noncommun/contrainte/:contrainte", () => {

                for (const CONTRAINTE of CONTRAINTES) {
                    it("Doit retourner un tableau non-vide " + CONTRAINTE, async () => {
                        const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + CONTRAINTE;
                        const mots: Mot[] = await WebRequest.json<Mot[]>(URL_TEST);
                        assert.notEqual(mots.length, 0);
                    });
                    it("Doit retourner des mots ayant des definitions " + CONTRAINTE, async () => {
                        const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + CONTRAINTE;
                        const mots: Mot[] = await WebRequest.json<Mot[]>(URL_TEST);
                        for (const MOT of mots) {
                        assert.notEqual(MOT.definitions.length, 0);
                        }
                    });
                }

                it("Erreur si aucun mot ne satisfait a la requete", async () => {
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + CONTRAINTE_IMPOSSIBLE;
                    const data: Mot[] = await WebRequest.json<Mot[]>(URL_TEST);
                    assert.equal(data, null);
                });
            });

            describe("Test de la validite des contraintes", () => {

                it("Contrainte invalide doit retourner une erreur", async () => {
                    const MOT_TEST: string = "a+()";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + MOT_TEST;
                    const mots: Mot[] = await WebRequest.json<Mot[]>(URL_TEST);
                    assert.equal(mots[0], undefined);
                });

                it("Mot invalide doit retourner une erreur", async () => {
                    const MOT_TEST: string = "abc4";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_DEFINITION + MOT_TEST;
                    const data: Mot = await WebRequest.json<Mot>(URL_TEST);
                    assert.equal(data[0], undefined);
                });
            });
        });
    });
}
