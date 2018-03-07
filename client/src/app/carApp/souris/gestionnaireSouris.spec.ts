import { GestionnaireSouris } from "./gestionnaireSouris";
import { FonctionSouris, EvenementSouris, TypeEvenementSouris } from "./evenementSouris";

describe("GestionnaireSouris", () => {

    let gestionnaire: GestionnaireSouris;

    const FONCTION: Function = GestionnaireSouris.prototype.inscrire;
    const FONCTION_SOURIS: FonctionSouris = new FonctionSouris(FONCTION, new EvenementSouris(TypeEvenementSouris.CLICK));

    const FONCTION2: Function = GestionnaireSouris.prototype.desinscrire;
    const FONCTION_SOURIS2: FonctionSouris = new FonctionSouris(FONCTION2, new EvenementSouris(TypeEvenementSouris.DOUBLECLICK));

    it("Constructeur", () => {
        gestionnaire = new GestionnaireSouris();
        expect(gestionnaire["listeRappel"]).toBeDefined();
        expect(gestionnaire["evenementRecu"]).toBeDefined();
    });

    it("devrait notifier lors d'un evenement", () => {
        gestionnaire.inscrire(FONCTION_SOURIS);
        gestionnaire.inscrire(FONCTION_SOURIS2);

        // TODO : tester l'appel au callback
        // gestionnaire.sourisCliquee(new MouseEvent("click"));
    });

});
