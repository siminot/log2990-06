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

    it("La méthode focus() doit être appelée sur un" +
       "inputElement sur le document lorsque focusSurBonneLettre est appelee",
       () => {
        const inputTest: HTMLInputElement = document.createElement("input") as HTMLInputElement;
        document.body.appendChild(inputTest);
        spyOn(document, "getElementById").and.returnValue(inputTest);
        component.focusSurBonneLettre(unMot);
        expect(inputTest.focus).toHaveBeenCalled();
    });
});
