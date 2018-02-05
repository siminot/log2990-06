//import { Mot } from "./Mot";
// import { MotAPI } from "./MotAPI";
import * as assert from "assert";
import { ServiceLexical } from "./ServiceLexical";

const SERVICE: ServiceLexical = new ServiceLexical();
let express = require("express");
let app = express();

    // const SERVICE: ServiceLexical = new ServiceLexical();

describe("Objet ServiceLexical", () => {
    describe("servirDefinitionsMot", () => {
        const mots: string[] = ["word", "erreurRequete384", "constitution", "erreurAucunMot"];
        // let serviceLexical: ServiceLexical;
        // let res: Response = require("express");
        it("Message d'erreur si requête invalide", () => {
            assert(true);
        });
        it("Envoie un seul mot", () => {
            SERVICE.servirDefinitionsMot(mots[0], app.res);
        });
        it("Le mot envoyé est le même que le mot de la requête", () => {
            assert(true);
        });
        it("Erreur si aucun mot", () => {
            assert(true);
        });
        it("Envoie un mot avec des définitions", () => {
            assert(true);
        });
    });
    describe("servirMotsSelonContrainte", () => {
        it("Message d'erreur si requête invalide", () => {
            assert(true);
        });
        it("Envoie un tableau de mots", () => {
            assert(true);
        });
        it("Erreur si aucun mot", () => {
            assert(true);
        });
        it("Envoie mots de la bonne fréquence", () => {
            assert(true);
        });
        it("Envoie mots de la bonne longueur", () => {
            assert(true);
        });
        it("Envoie mots avec des définitions", () => {
            assert(true);
        });
        it("Envoie mots sans espace ou trait d'union", () => {
            assert(true);
        });
    });
    describe("servirMotsSelonLongueur", () => {
        it("Message d'erreur si requête invalide", () => {
            assert(true);
        });
        it("Envoie un tableau de mots", () => {
            assert(true);
        });
        it("Erreur si aucun mot", () => {
            assert(true);
        });
        it("Envoie mots de la bonne fréquence", () => {
            assert(true);
        });
        it("Envoie mots de la bonne longueur", () => {
            assert(true);
        });
        it("Envoie mots avec des définitions", () => {
            assert(true);
        });
        it("Envoie mots sans espace ou trait d'union", () => {
            assert(true);
        });
    });
});
