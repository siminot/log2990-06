import { ConteneurFonctionSouris } from "./conteneurFonctionsSouris";
import { EvenementSouris, TypeEvenementSouris, FonctionSouris } from "./evenementSouris";

describe("GestionnaireSouris", () => {

    let conteneur: ConteneurFonctionSouris;

    beforeEach(() => {
        conteneur = new ConteneurFonctionSouris();
    });

    it("Constructeur", () => {
        expect(conteneur).toBeDefined();
    });

    const FONCTION: Function = ConteneurFonctionSouris.prototype.ajouter;
    const FONCTION2: Function = ConteneurFonctionSouris.prototype.retirer;
    const EVENEMENT_SOURIS: EvenementSouris = new EvenementSouris(TypeEvenementSouris.CLICK);
    const FONCTION_SOURIS: FonctionSouris = new FonctionSouris(FONCTION, EVENEMENT_SOURIS);
    const FONCTION_SOURIS2: FonctionSouris = new FonctionSouris(FONCTION2, EVENEMENT_SOURIS);

    it("Devrait retourner les fonctions", () => {
        const TABLEAU_TEST: Function[] = [FONCTION, FONCTION2];
        conteneur.ajouter(FONCTION_SOURIS);
        conteneur.ajouter(FONCTION_SOURIS2);
        expect(conteneur.obtenirFonctions(EVENEMENT_SOURIS).length).toEqual(TABLEAU_TEST.length);
        expect(conteneur.obtenirFonctions(EVENEMENT_SOURIS).find((element: Function) => element === FONCTION)).toEqual(FONCTION);
        expect(conteneur.obtenirFonctions(EVENEMENT_SOURIS).find((element: Function) => element === FONCTION2)).toEqual(FONCTION2);
    });

    it("Devrait ajouter la fonction", () => {
        const ANCIENNE_LONGUEUR: number = conteneur.obtenirFonctions(EVENEMENT_SOURIS).length;
        conteneur.ajouter(FONCTION_SOURIS);
        expect(conteneur.obtenirFonctions(EVENEMENT_SOURIS).length).toEqual(ANCIENNE_LONGUEUR + 1);
        expect(conteneur.obtenirFonctions(EVENEMENT_SOURIS).find((element: Function) => element === FONCTION)).toEqual(FONCTION);
    });

    it("Devrait retirer la fonction", () => {
        conteneur.ajouter(FONCTION_SOURIS);
        const ANCIENNE_LONGUEUR: number = conteneur.obtenirFonctions(EVENEMENT_SOURIS).length;
        conteneur.retirer(FONCTION_SOURIS);
        expect(conteneur.obtenirFonctions(EVENEMENT_SOURIS).length).toEqual(ANCIENNE_LONGUEUR - 1);
        expect(conteneur.obtenirFonctions(EVENEMENT_SOURIS).findIndex((element: Function) => element === FONCTION)).toEqual(-1);
    });
});
