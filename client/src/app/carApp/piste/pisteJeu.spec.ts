import { PisteJeu } from "./pisteJeu";
import { PISTE_TEST } from "./pisteTest";

let piste: PisteJeu;

describe("PisteJeu", () => {

    describe("Constructeur: ", () => {
        it("le constructeur doit fonctionner", () => {
            piste = new PisteJeu();
            expect(piste).toBeTruthy();
        });
    });

    describe("Ajout de points", () => {

        it("Importer une piste fonctionne", () => {
            expect(piste["intersections"].length).toEqual(0);
            piste.importer(PISTE_TEST);
            expect(piste["intersections"].length).toEqual(PISTE_TEST.length);
        });

        it("La piste contient le bon nombre d'elements", () => {
            expect(piste.children.length).toEqual(PISTE_TEST.length + 1);
        });
    });
});
