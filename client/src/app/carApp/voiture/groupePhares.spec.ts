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
        groupePhares.initialiser();
        expect(groupePhares.children.length).toBe(NOMBRE_ENFANTS);
    });

    it("Phares s'eteignent", () => {
        spyOn(groupePhares, "eteindre");
        groupePhares.eteindre();
        expect(groupePhares.eteindre).toHaveBeenCalled();
    });

    it("Phares s'allument", () => {
        spyOn(groupePhares, "allumer");
        groupePhares.allumer();
        expect(groupePhares.allumer).toHaveBeenCalled();
    });
});
