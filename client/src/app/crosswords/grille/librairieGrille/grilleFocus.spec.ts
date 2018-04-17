import { GrilleFocus } from "./grilleFocus";
import { Mot } from "../../objetsTest/mot";

describe("Grille Focus", () => {
    const mockDock: Document = new Document();
    const component: GrilleFocus = new GrilleFocus(mockDock, 0);

    it("Construction reussite", () => {
        expect(component).toBeTruthy();
    });

    const unMot: Mot = new Mot();
    unMot.mot = "test";
    unMot.premierX = 0;
    unMot.premierY = 0;
    unMot.positionsLettres = ["00", "01", "02", "03"];

    const motVide: Mot = new Mot();
    motVide.mot = "";

    it("Devrait retourner faux", () => {
        expect(component["isLastLetterOfWord"](unMot)).toEqual(false);
    });

    it("Devrait retourner vrai", () => {
        expect(component["isLastLetterOfWord"](motVide)).toEqual(false);
    });

    it("Devrait retourner faux", () => {
        expect(component.focusOnNextLetter(unMot)).toEqual(false);
    });

    it("Devrait retourner faux", () => {
        expect(component.focusOnNextLetter(motVide)).toEqual(false);
    });
});
