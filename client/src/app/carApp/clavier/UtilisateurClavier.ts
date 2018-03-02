import { OnDestroy } from "@angular/core";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { FonctionTouche, EvenementClavier } from "../clavier/evenementClavier";

export class UtilisateurClavier implements OnDestroy {
    private touchesEnregistrees: FonctionTouche[];

    public constructor(private gestionnaireClavier: GestionnaireClavier) {
        this.touchesEnregistrees = [];
        this.gestionnaireClavier = gestionnaireClavier;
    }

    public ngOnDestroy(): void {
        this.desinscriptionTouches();
    }

    public ajouterTouche(fonction: Function, evenementClavier: EvenementClavier): void {
        const fonctionTouche: FonctionTouche = new FonctionTouche(fonction, evenementClavier);
        this.touchesEnregistrees.push(fonctionTouche);
        this.inscriptionTouche(fonctionTouche);
    }

    private inscriptionTouche(fonctionTouche: FonctionTouche): void {
        this.gestionnaireClavier.inscrire(fonctionTouche);
    }

    private desinscriptionTouches(): void {
        for (const touche of this.touchesEnregistrees) {
            this.gestionnaireClavier.desinscrire(touche);
        }
    }
}
