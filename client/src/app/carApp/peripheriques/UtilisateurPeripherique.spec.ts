import { UtilisateurPeripherique } from "./UtilisateurPeripherique";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { EvenementClavier, TypeEvenementClavier, FonctionTouche } from "../clavier/evenementClavier";

describe("UtilisateurPeripherique", () => {

    let utilisateur: UtilisateurPeripherique;

    it("Constructeur", () => {
        utilisateur = new UtilisateurPeripherique(new GestionnaireClavier());
        expect(utilisateur).toBeDefined();
    });

    const FONCTION: Function = UtilisateurPeripherique.prototype.ajouter;
    const EVENEMENT_CLAVIER: EvenementClavier = new EvenementClavier("c", TypeEvenementClavier.TOUCHE_APPUYEE);
    const FONCTION_TOUCHE: FonctionTouche = new FonctionTouche(FONCTION, EVENEMENT_CLAVIER);

    it("Devrait ajouter les evenements", () => {
        const TAILLE_AVANT: number = utilisateur["fonctionsEnregistrees"].length;
        utilisateur.ajouter(FONCTION, EVENEMENT_CLAVIER);
        expect(utilisateur["fonctionsEnregistrees"].length).toEqual(TAILLE_AVANT + 1);
        expect(utilisateur["fonctionsEnregistrees"][0].evenement).toEqual(FONCTION_TOUCHE.evenement);
        expect(utilisateur["fonctionsEnregistrees"][0].fonction).toEqual(FONCTION_TOUCHE.fonction);

    });

    it("Devrait supprimer les fonctions", () => {
        const TAILLE_AVANT: number = utilisateur["gestionnaire"]["listeRappel"].obtenirFonctions(FONCTION_TOUCHE.evenement).length;
        expect(TAILLE_AVANT).toEqual(1);
        utilisateur["ngOnDestroy"]();
        expect(utilisateur["fonctionsEnregistrees"]).toBe(null);
        expect(utilisateur["gestionnaire"]["listeRappel"].obtenirFonctions(FONCTION_TOUCHE.evenement).length).toEqual(TAILLE_AVANT - 1);
    });
});
