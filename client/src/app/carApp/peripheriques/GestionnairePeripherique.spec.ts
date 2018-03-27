import { GestionnairePeripherique } from "./GestionnairePeripherique";
import { FonctionTouche, EvenementClavier, TypeEvenementClavier } from "../clavier/evenementClavier";
import { ConteneurFonctionSouris } from "../souris/conteneurFonctionsSouris";

export class TestGestionnairePeripherique extends GestionnairePeripherique {
    protected listeRappel: ConteneurFonctionSouris = new ConteneurFonctionSouris();
}

describe("GestionnairePeripherique", () => {

    const gestionnaire: TestGestionnairePeripherique = new TestGestionnairePeripherique();

    it("Constructeur", () => {
        expect(gestionnaire).toBeDefined();
    });

    const FONCTION: Function = TestGestionnairePeripherique.prototype.inscrire;
    const EVENEMENT_CLAVIER: EvenementClavier = new EvenementClavier("c", TypeEvenementClavier.TOUCHE_APPUYEE);
    const FONCTION_TOUCHE: FonctionTouche = new FonctionTouche(FONCTION, EVENEMENT_CLAVIER);

    const FONCTION2: Function = TestGestionnairePeripherique.prototype.desinscrire;
    const EVENEMENT_CLAVIER2: EvenementClavier = new EvenementClavier("f", TypeEvenementClavier.TOUCHE_PRESSEE);
    const FONCTION_TOUCHE2: FonctionTouche = new FonctionTouche(FONCTION2, EVENEMENT_CLAVIER2);

    it("Devrait inscrire les fonctions", () => {
        gestionnaire.inscrire(FONCTION_TOUCHE);
        gestionnaire.inscrire(FONCTION_TOUCHE2);
        expect(gestionnaire["listeRappel"].obtenirFonctions(FONCTION_TOUCHE.evenement)
            .find((element: Function) => element === FONCTION_TOUCHE.fonction)).toEqual(FONCTION);
        expect(gestionnaire["listeRappel"].obtenirFonctions(FONCTION_TOUCHE2.evenement)
            .find((element: Function) => element === FONCTION_TOUCHE2.fonction)).toEqual(FONCTION2);
    });

    it("Devrait supprimer les fonctions", () => {
        gestionnaire.desinscrire(FONCTION_TOUCHE);
        expect(gestionnaire["listeRappel"].obtenirFonctions(FONCTION_TOUCHE.evenement)
            .findIndex((element: Function) => element === FONCTION_TOUCHE.fonction)).toEqual(-1);
    });
});
