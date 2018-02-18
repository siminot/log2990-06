import { GroupePhares } from "./groupePhares";

const NOMBRE_ENFANTS: number = 3;

describe("GroupePhares", () => {
    let groupePhares: GroupePhares;

    it("Instanciation avec constructeur", () => {
        groupePhares = new GroupePhares();
        expect(groupePhares).toBeDefined();
        expect(groupePhares.children.length).toBe(0);
    });

    it("Initialisation se fait bien", () => {
        groupePhares.init();
        expect(groupePhares.sontAllumes).toBeTruthy();
        expect(groupePhares.children.length).toBe(NOMBRE_ENFANTS);
    });

    it("Phares s'eteignent", () => {
       groupePhares.eteindre();
       expect(groupePhares.sontAllumes).toBeFalsy();
    });

    it("Phares s'allument", () => {
        groupePhares.allumer();
        expect(groupePhares.sontAllumes).toBeTruthy();
    });
});
