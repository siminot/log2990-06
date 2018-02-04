import { RouteServiceLexical } from "./routeServiceLexical";
import { ServiceLexical } from "./ServiceLexical";
import { ServiceWeb } from "../serviceweb";
import { request } from "http";

{
    const assert = require("assert");
    // const expect = require("expect");

    describe("routeServiceLexical", () => {
        describe("Constructeur", () => {

            it("Creation d'un service web", () => {
                assert(RouteServiceLexical.constructor(ServiceLexical));
            });
        });

        describe("accederRoute", () => {

            it("doit retourner un tableau de mots", () => {
                // const SERVICE: ServiceLexical = new ServiceLexical();
                // const route: RouteServiceLexical = new RouteServiceLexical(SERVICE);
                assert(true);
            });
        });
    });
}
