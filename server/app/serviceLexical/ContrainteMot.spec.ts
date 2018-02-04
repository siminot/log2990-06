/*
{
    // const assert = require("assert");
    const difficulte = require("./Difficulte");
    const contrainteMot = require("./ContrainteMot");
    const expect = require("expect");

    describe("ContrainteMot", () => {
        describe("Constructeur", () => {

            it("doit retourner une erreur (longueur mot negative)", function() {
                expect(contrainteMot.constructor(-5, difficulte.Facile)).toThrowError;
            });

            it("doit etre construit", function() {
                expect(contrainteMot.constructor(4, difficulte.Moyen)).toBeDefined();
            });

        });

        describe("ajouterContrainte", () => {
            const contrainte = contrainteMot.constructor(5, difficulte.Facile);

            it("doit retourner une erreur (indice negatif)", function() {
                expect(contrainte.ajouterContrainte(-5, "A")).toThrowError;
            });

            it("doit retourner une erreur (pas une lettre)", function() {
                expect(contrainte.ajouterContrainte(5, "-")).toThrowError;
            });

            it("ne doit pas retourner d'erreur", function() {
                expect(contrainte.ajouterContrainte(5, "A")).not.toThrowError();
            });

        });
    });
}
*/