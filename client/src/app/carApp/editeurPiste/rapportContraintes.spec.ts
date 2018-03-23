import { RapportContraintes } from "./rapportContraintes";

describe("RapportContrainte", () => {
    let rapport: RapportContraintes;

    beforeEach(() => {
        rapport = new RapportContraintes();
    });

    describe("Constructeur", () => {
        it("Objet est construit", () => {
            rapport = new RapportContraintes();
            expect(rapport).toBeDefined();
        });
    });

    describe("Modification du rapport", () => {
        it("Elements sont faux par defaut", () => {
            expect(rapport.angleArriveeRespectee).toBeFalsy();
            expect(rapport.angleDebutRespectee).toBeFalsy();
            expect(rapport.longueurRespectee).toBeFalsy();
            expect(rapport.pasCroisementRespecte).toBeFalsy();
            expect(rapport.contraintesRespectees).toBeFalsy();
        });

        it("Modification des angles", () => {
            rapport.angleArriveeRespectee = true;
            rapport.angleDebutRespectee = true;
            expect(rapport.angleArriveeRespectee).toBeTruthy();
            expect(rapport.angleDebutRespectee).toBeTruthy();
            expect(rapport.contraintesRespectees).toBeFalsy();
        });

        it("Modification de la longueur", () => {
            rapport.longueurRespectee = true;
            expect(rapport.longueurRespectee).toBeTruthy();
            expect(rapport.contraintesRespectees).toBeFalsy();
        });

        it("Modification du croisement", () => {
            rapport.pasCroisementRespecte = true;
            expect(rapport.pasCroisementRespecte).toBeTruthy();
            expect(rapport.contraintesRespectees).toBeFalsy();
        });

        it("Modification de tout", () => {
            rapport.angleArriveeRespectee = true;
            rapport.angleDebutRespectee = true;
            rapport.pasCroisementRespecte = true;
            rapport.longueurRespectee = true;
            expect(rapport.contraintesRespectees).toBeTruthy();
        });
    });
});
