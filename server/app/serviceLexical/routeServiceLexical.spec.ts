/*
    Tests des routes.
    Le serveur doit être en marche pour que les tests fonctionnent.
*/
import * as assert from "assert";
import { RouteServiceLexical } from "./routeServiceLexical";
import { ServiceLexical } from "./ServiceLexical";
import { Mot } from "./Mot";
import * as WebRequest from "web-request";
import { ServiceWeb } from "../serviceweb";

const SERVICE: ServiceLexical = new ServiceLexical();
const ROUTE: ServiceWeb = new RouteServiceLexical(SERVICE);

const URL_SERVICE_LEXICAL: string = "http://localhost:3000" + ROUTE.mainRoute;
const URL_DEFINITION = "/def/";
const URL_LONGUEUR = "/longueur/";
const URL_COMMUN = "/commun";
const URL_NONCOMMUN = "/noncommun";
const URL_CONTRAINTE = "/contrainte/";
const MESSAGE_AUCUN_RESULTAT = "Aucun resultat";

{
    describe("routeServiceLexical", () => {
        describe("Constructeur", () => {

            it("Creation d'un service web", () => {
                assert.notEqual(RouteServiceLexical.constructor(ServiceLexical), null || undefined);
            });
        });

        describe("Accéder aux routes (serveur doit rouler pour que ca fonctionne)", () => {
            const CONTRAINTES = ["t__", "_r_b_", "__ws", "g____r___", "h____r__"];
            const CONTRAINTE_IMPOSSIBLE = "dwz__";
            const LONGUEUR = 4;

            describe("/commun/contrainte/:contrainte", () => {
                for (const CONTRAINTE of CONTRAINTES) {
                    it("Doit retourner un tableau non-vide " + CONTRAINTE, async () => {
                        const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_CONTRAINTE + CONTRAINTE;
                        const mots = await WebRequest.json<Mot[]>(URL_TEST);
                        assert.notEqual(mots.length, 0);
                    });
                    it("Doit retourner des mots ayant des definitions " + CONTRAINTE, async () => {
                        const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_CONTRAINTE + CONTRAINTE;
                        const mots = await WebRequest.json<Mot[]>(URL_TEST);
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
                        const mots = await WebRequest.json<Mot[]>(URL_TEST);
                        assert.notEqual(mots.length, 0);
                    });
                    it("Doit retourner des mots ayant des definitions " + CONTRAINTE, async () => {
                        const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + CONTRAINTE;
                        const mots = await WebRequest.json<Mot[]>(URL_TEST);
                        for (const MOT of mots) {
                        assert.notEqual(MOT.definitions.length, 0);
                        }
                    });
                }

                it("Erreur si aucun mot ne satisfait a la requete", async () => {
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + CONTRAINTE_IMPOSSIBLE;
                    const data = await WebRequest.json<Mot[]>(URL_TEST);
                    assert.equal(data, MESSAGE_AUCUN_RESULTAT);
                });
            });

            describe("/noncommun/longueur/:longueur", () => {

                it("Doit retourner un tableau de mots", async () => {
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_LONGUEUR + LONGUEUR;
                    const mots = await WebRequest.json<Mot[]>(URL_TEST);
                    assert.notEqual(mots.length, 0);
                });
                it("Erreur si aucun mot ne satisfait a la requete", async () => {
                    const LONGUEUR_TROP_GRANDE = 33;
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_LONGUEUR + LONGUEUR_TROP_GRANDE;
                    const data = await WebRequest.json<Mot[]>(URL_TEST);
                    assert.equal(data, MESSAGE_AUCUN_RESULTAT);
                });
            });

            describe("/commun/longueur/:longueur", () => {

                it("Doit retourner un tableau de mots", async () => {
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_LONGUEUR + LONGUEUR;
                    const mots = await WebRequest.json<Mot[]>(URL_TEST);
                    assert.notEqual(mots.length, 0);
                });
            });

            describe("/def/:mot", () => {

                it("Doit retourner le meme mot que la requete", async () => {
                    const MOT = "test";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_DEFINITION + MOT;
                    const data = await WebRequest.json<Mot>(URL_TEST);
                    assert(data.mot === MOT);
                });

                it("Erreur si aucun mot ne satisfait a la requete", async () => {
                    const MOT_INEXISTANT = "moterreur";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_DEFINITION + MOT_INEXISTANT;
                    const data = await WebRequest.json<Mot[]>(URL_TEST).catch();
                    assert.equal(data, MESSAGE_AUCUN_RESULTAT);
                });
            });

            describe("Test de la validite des contraintes", () => {

                it("Contrainte invalide doit retourner une erreur", async () => {
                    const MOT_TEST = "a+()";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + MOT_TEST;
                    const mots = await WebRequest.json<Mot[]>(URL_TEST);
                    assert.equal(mots[0], undefined);
                });

                it("Longueur invalide doit retourner une erreur", async () => {
                    const LONGUEUR_TEST = "abcd";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_LONGUEUR + LONGUEUR_TEST;
                    const mots = await WebRequest.json<Mot[]>(URL_TEST);
                    assert.equal(mots[0], undefined);
                });

                it("Mot invalide doit retourner une erreur", async () => {
                    const MOT_TEST = "abc4";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_DEFINITION + MOT_TEST;
                    const data = await WebRequest.json<Mot>(URL_TEST);
                    assert.equal(data[0], undefined);
                });
            });
        });
    });
}
