import { UtilisateurClavier } from "../clavier/UtilisateurClavier";
import { EvenementClavier, TypeEvenementClavier, FonctionTouche } from "../clavier/evenementClavier";
import { GestionnaireCamera } from "./GestionnaireCamera";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";

const ZOOM: EvenementClavier = new EvenementClavier("=", TypeEvenementClavier.TOUCHE_RELEVEE);
const DEZOOM: EvenementClavier = new EvenementClavier("-", TypeEvenementClavier.TOUCHE_RELEVEE);

export class ClavierCamera extends UtilisateurClavier {
    private objet: GestionnaireCamera;

    public constructor(gestionnaireClavier: GestionnaireClavier,
                       objet: GestionnaireCamera) {
        super(gestionnaireClavier);
        this.objet = objet;
    }

    protected creationTouches(): void {
        this.touchesEnregistrees.push(new FonctionTouche(this.objet.zoomer.bind(this), ZOOM));
        this.touchesEnregistrees.push(new FonctionTouche(this.objet.dezoomer.bind(this), DEZOOM));
    }
}
