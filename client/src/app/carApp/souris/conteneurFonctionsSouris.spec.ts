import { ConteneurFonctionSouris } from "./conteneurFonctionsSouris";
import { EvenementSouris, TypeEvenementSouris, FonctionSouris } from "./evenementSouris";

describe("conteneurFonctionsClavier", () => {

    let conteneur: ConteneurFonctionSouris;

    beforeEach(() => {
        conteneur = new ConteneurFonctionSouris();
    });

    it("constructeur", () => {
        expect(conteneur).toBeDefined();
    });

    const FONCTION: Function = ConteneurFonctionSouris.prototype.ajouter;
    const FONCTION2: Function = ConteneurFonctionSouris.prototype.retirer;
    const EVENEMENT_CLAVIER: EvenementSouris = new EvenementSouris(TypeEvenementSouris.CLICK);
    const FONCTION_TOUCHE: FonctionSouris = new FonctionSouris(FONCTION, EVENEMENT_CLAVIER);
    const FONCTION_TOUCHE2: FonctionSouris = new FonctionSouris(FONCTION2, EVENEMENT_CLAVIER);

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
