{
    //const assert = require("assert");
    let Difficulte = require("./Difficulte");
    let ContrainteMot = require("./ContrainteMot");
    let expect = require("expect");

    describe("ContrainteMot", () => {
        describe("Constructeur", () => {

            it("doit retourner une erreur (longueur mot negative)", function() {
                expect(ContrainteMot.constructor(-5, Difficulte.Facile)).toThrowError;
            })

            it("doit etre construit", function() {
                expect(ContrainteMot.constructor(4, Difficulte.Moyen)).toBeDefined();
            })

        });

        describe("ajouterContrainte", () => {
            let contrainte = ContrainteMot.constructor(5, Difficulte.Facile)

            it("doit retourner une erreur (indice negatif)", function() {
                expect(contrainte.ajouterContrainte(-5, "A")).toThrowError;
            })

            it("doit retourner une erreur (pas une lettre)", function() {
                expect(contrainte.ajouterContrainte(5, "-")).toThrowError;
            })

            it("ne doit pas retourner d'erreur", function() {
                expect(contrainte.ajouterContrainte(5, "A")).not.toThrowError();
            })

        });
    });
}
