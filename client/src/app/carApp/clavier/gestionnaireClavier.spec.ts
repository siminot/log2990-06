import { GestionnaireClavier } from "./gestionnaireClavier";
// import { EvenementClavier, FonctionTouche, TypeEvenementClavier } from "./evenementClavier";

describe("GestionnaireClavier", () => {

    let gestionnaire: GestionnaireClavier;

    /*
    const FONCTION: Function = GestionnaireClavier.prototype.inscrire;
    const TOUCHE_C: string = "c";
    const EVENEMENT_CLAVIER: EvenementClavier = new EvenementClavier(TOUCHE_C, TypeEvenementClavier.TOUCHE_APPUYEE);
    const FONCTION_TOUCHE: FonctionTouche = new FonctionTouche(FONCTION, EVENEMENT_CLAVIER);

    const FONCTION2: Function = GestionnaireClavier.prototype.desinscrire;
    const TOUCHE_F: string = "f";
    const EVENEMENT_CLAVIER2: EvenementClavier = new EvenementClavier(TOUCHE_F, TypeEvenementClavier.TOUCHE_PRESSEE);
    const FONCTION_TOUCHE2: FonctionTouche = new FonctionTouche(FONCTION2, EVENEMENT_CLAVIER2);
    */

    it("Constructeur", () => {
        gestionnaire = new GestionnaireClavier();
        expect(gestionnaire["listeRappel"]).toBeDefined();
        expect(gestionnaire["evenementRecu"]).toBeDefined();
    });

    /*
    it("devrait notifier lors d'un evenement", () => {
        gestionnaire.inscrire(FONCTION_TOUCHE);
        gestionnaire.inscrire(FONCTION_TOUCHE2);
        estionnaire.toucheAppuyee(new KeyboardEvent("keydown", {key: TOUCHE_C}));
    });
    */

});
