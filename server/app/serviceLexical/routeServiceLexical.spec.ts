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

{
    describe("routeServiceLexical", () => {
        describe("Constructeur", () => {

            it("Creation d'un service web", () => {
                assert.notEqual(RouteServiceLexical.constructor(ServiceLexical), null || undefined);
            });
        });

        describe("Accéder aux routes", () => {
            const CONTRAINTE = "t__";
            const LONGUEUR = 4;

            it("/commun/contrainte/:contrainte doit retourner un tableau de mots", () => {
                const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_CONTRAINTE + CONTRAINTE;
                let mots: Mot[] = [];

                WebRequest.json<Mot[]>(URL_TEST).then(async (data: Mot[]) => {
                    await data;
                    mots = data;
                }).catch();

                assert.notEqual(mots.length, 0);
            });

            it("/noncommun/contrainte/:contrainte doit retourner un tableau de mots", () => {
                const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + CONTRAINTE;

                WebRequest.json<Mot[]>(URL_TEST).then((data: Mot[]) => {
                    assert.notEqual(data.length, 0);
                });
            });

            it("/noncommun/longueur/:longueur doit retourner un tableau de mots", () => {
                const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_LONGUEUR + LONGUEUR;

                WebRequest.json<Mot[]>(URL_TEST).then((data: Mot[]) => {
                    assert.notEqual(data.length, 0);
                });
            });

            it("/commun/longueur/:longueur doit retourner un tableau de mots", () => {
                const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_LONGUEUR + LONGUEUR;

                WebRequest.json<Mot[]>(URL_TEST).then((data: Mot[]) => {
                    assert.notEqual(data.length, 0);
                });
            });

            it("/def/:mot doit retourner un tableau de mots", () => {
                const MOT = "test";
                const URL_TEST: string = URL_SERVICE_LEXICAL + URL_DEFINITION + MOT;

                WebRequest.json<Mot[]>(URL_TEST).then((data: Mot[]) => {
                    assert.equal(data.length, 1);
                });
            });

            describe("Test de la validite des contraintes", () => {

                it("Contrainte invalide ne doit pas retourner un tableau", () => {
                    const MOT_TEST = "a+()";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + MOT_TEST;

                    WebRequest.json<Mot[]>(URL_TEST).then((data: Mot[]) => {
                        assert.equal(data, undefined);
                    });
                });

                it("Longueur invalide ne doit pas retourner un tableau", () => {
                    const LONGUEUR_TEST = "abcd";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_LONGUEUR + LONGUEUR_TEST;

                    WebRequest.json<Mot[]>(URL_TEST).then((data: Mot[]) => {
                        assert.equal(data, undefined);
                    });
                });
            });
        });
    });
}
