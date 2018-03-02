import { OnDestroy } from "@angular/core";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { FonctionTouche } from "../clavier/evenementClavier";

export abstract class UtilisateurClavier implements OnDestroy {
    protected touchesEnregistrees: FonctionTouche[];

    protected constructor(private gestionnaireClavier: GestionnaireClavier) {
        this.touchesEnregistrees = [];
        this.gestionnaireClavier = gestionnaireClavier;
    }

    public ngOnDestroy(): void {
        this.desinscriptionTouches();
    }

    protected initialisationTouches(): void {
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
