import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { FonctionTouche } from "../clavier/evenementClavier";

export abstract class UtilisateurClavier {
    protected gestionnaireClavier: GestionnaireClavier;
    protected touchesEnregistrees: FonctionTouche[];

    protected constructor(gestionnaireClavier: GestionnaireClavier) {
        this.touchesEnregistrees = [];
        this.gestionnaireClavier = gestionnaireClavier;
        this.initialisationTouches();
    }

    private initialisationTouches(): void {
        this.creationTouches();
        this.inscriptionTouches();
    }

    private inscriptionTouches(): void {
        for (const touche of this.touchesEnregistrees) {
            this.gestionnaireClavier.inscrire(touche);
        }
    }

    public desinscriptionTouches(): void {
        for (const touche of this.touchesEnregistrees) {
            this.gestionnaireClavier.desinscrire(touche);
        }
    }

    protected abstract creationTouches(): void;
}
