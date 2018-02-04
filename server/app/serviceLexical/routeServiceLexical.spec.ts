import * as assert from "assert";
import { RouteServiceLexical } from "./routeServiceLexical";
import { ServiceLexical } from "./ServiceLexical";
import { MotAPI } from "./MotAPI";
import * as WebRequest from "web-request";
import { ServiceWeb } from "../serviceweb";

const SERVICE: ServiceLexical = new ServiceLexical();
const ROUTE: ServiceWeb = new RouteServiceLexical(SERVICE);

const URL_SERVICE_LEXICAL: string = "http://localhost:3000" + ROUTE.mainRoute;
const URL_DEFINITION: string = "/def";
const URL_LONGUEUR: string = "/longueur";
const URL_COMMUN: string = "/commun";
const URL_NONCOMMUN: string = "/noncommun";
const URL_CONTRAINTE: string = "/contrainte";

{
    describe("routeServiceLexical", () => {
        describe("Constructeur", () => {

            it("Creation d'un service web", () => {
                assert.notEqual(RouteServiceLexical.constructor(ServiceLexical), null || undefined);
            });
        });

        describe("Accéder aux routes", () => {
            const CONTRAINTE: string = "t__";
            const LONGUEUR: number = 4;

            it("/commun/contrainte/:contrainte doit retourner un tableau de mots", () => {
                const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_CONTRAINTE + CONTRAINTE;

                WebRequest.json<MotAPI[]>(URL_TEST).then((data: MotAPI[]) => {
                    assert.notEqual(data.length, 0);
                });
            });

            it("/noncommun/contrainte/:contrainte doit retourner un tableau de mots", () => {
                const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + CONTRAINTE;

                WebRequest.json<MotAPI[]>(URL_TEST).then((data: MotAPI[]) => {
                    assert.notEqual(data.length, 0);
                });
            });

            it("/noncommun/longueur/:longueur doit retourner un tableau de mots", () => {
                const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_LONGUEUR + LONGUEUR;

                WebRequest.json<MotAPI[]>(URL_TEST).then((data: MotAPI[]) => {
                    assert.notEqual(data.length, 0);
                });
            });

            it("/commun/longueur/:longueur doit retourner un tableau de mots", () => {
                const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_LONGUEUR + LONGUEUR;

                WebRequest.json<MotAPI[]>(URL_TEST).then((data: MotAPI[]) => {
                    assert.notEqual(data.length, 0);
                });
            });

            it("/def/:mot doit retourner un tableau de mots", () => {
                const MOT: string = "test";
                const URL_TEST: string = URL_SERVICE_LEXICAL + URL_DEFINITION + MOT;

                WebRequest.json<MotAPI[]>(URL_TEST).then((data: MotAPI[]) => {
                    assert.equal(data.length, 1);
                });
            });

            describe("Test de la validite des contraintes", () => {

                it("Contrainte invalide ne doit pas retourner un tableau", () => {
                    const MOT_TEST: string = "a+()";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_NONCOMMUN + URL_CONTRAINTE + MOT_TEST;

                    WebRequest.json<MotAPI[]>(URL_TEST).then((data: MotAPI[]) => {
                        assert.equal(data, undefined);
                    });
                });

                it("Longueur invalide ne doit pas retourner un tableau", () => {
                    const LONGUEUR_TEST: string = "abcd";
                    const URL_TEST: string = URL_SERVICE_LEXICAL + URL_COMMUN + URL_LONGUEUR + LONGUEUR_TEST;

                    WebRequest.json<MotAPI[]>(URL_TEST).then((data: MotAPI[]) => {
                        assert.equal(data, undefined);
                    });
                });
            });
        });
    });
}
