// import { RouteServiceLexical } from "./routeServiceLexical";
// import { ServiceLexical } from "./ServiceLexical";

{
    const assert = require("assert");
    const expect = require("expect");
    const routeServiceLexical = require("routeServiceLexical");
    const serviceLexical = require("serviceLexical");

    describe("routeServiceLexical", () => {
        describe("Constructeur", () => {

            it("doit creer un service web", () => {
                // const service: ServiceLexical = new ServiceLexical();
                // const route: RouteServiceLexical = new RouteServiceLexical(service);
                expect(routeServiceLexical).to.be.an("object");
            });
        });

        describe("accederRoute", () => {

            it("doit retourner un tableau de mots", () => {
                assert(true);
            });
        });
    });
}
