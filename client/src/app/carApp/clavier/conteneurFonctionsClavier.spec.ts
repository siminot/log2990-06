import { ConteneurFonctionsClavier } from "./conteneurFonctionsClavier";
import { FonctionTouche, EvenementClavier, TypeEvenementClavier } from "./evenementClavier";

describe("ConteneurFonctionsClavier", () => {

    let conteneur: ConteneurFonctionsClavier;

    beforeEach(() => {
        conteneur = new ConteneurFonctionsClavier();
    });

    it("Constructeur", () => {
        expect(conteneur).toBeDefined();
    });

    const FONCTION: Function = ConteneurFonctionsClavier.prototype.ajouter;
    const EVENEMENT_CLAVIER: EvenementClavier = new EvenementClavier("c", TypeEvenementClavier.TOUCHE_APPUYEE);
    const FONCTION_TOUCHE: FonctionTouche = new FonctionTouche(FONCTION, EVENEMENT_CLAVIER);

    const FONCTION2: Function = ConteneurFonctionsClavier.prototype.retirer;
    const FONCTION_TOUCHE2: FonctionTouche = new FonctionTouche(FONCTION2, EVENEMENT_CLAVIER);

    it("Devrait retourner les fonctions", () => {
        const TABLEAU_TEST: Function[] = [FONCTION, FONCTION2];
        conteneur.ajouter(FONCTION_TOUCHE);
        conteneur.ajouter(FONCTION_TOUCHE2);
        expect(conteneur.obtenirFonctions(EVENEMENT_CLAVIER).length).toEqual(TABLEAU_TEST.length);
        expect(conteneur.obtenirFonctions(EVENEMENT_CLAVIER).find((element: Function) => element === FONCTION)).toEqual(FONCTION);
        expect(conteneur.obtenirFonctions(EVENEMENT_CLAVIER).find((element: Function) => element === FONCTION2)).toEqual(FONCTION2);
    });

    it("Devrait ajouter la fonction", () => {
        const ANCIENNE_LONGUEUR: number = conteneur.obtenirFonctions(EVENEMENT_CLAVIER).length;
        conteneur.ajouter(FONCTION_TOUCHE);
        expect(conteneur.obtenirFonctions(EVENEMENT_CLAVIER).length).toEqual(ANCIENNE_LONGUEUR + 1);
        expect(conteneur.obtenirFonctions(EVENEMENT_CLAVIER).find((element: Function) => element === FONCTION)).toEqual(FONCTION);
    });

    it("Devrait retirer la fonction", () => {
        conteneur.ajouter(FONCTION_TOUCHE);
        const ANCIENNE_LONGUEUR: number = conteneur.obtenirFonctions(EVENEMENT_CLAVIER).length;
        conteneur.retirer(FONCTION_TOUCHE);
        expect(conteneur.obtenirFonctions(EVENEMENT_CLAVIER).length).toEqual(ANCIENNE_LONGUEUR - 1);
        expect(conteneur.obtenirFonctions(EVENEMENT_CLAVIER).findIndex((element: Function) => element === FONCTION)).toEqual(-1);
    });
});
