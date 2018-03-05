import { OnDestroy } from "@angular/core";
import { IFonctionPeripherique} from "./IFonctionPeripherique";
import { GestionnairePeripherique } from "./GestionnairePeripherique";
import { IEvenement } from "./IEvenement";

export class UtilisateurPeripherique implements OnDestroy {
    private fonctionsEnregistrees: IFonctionPeripherique[];

    public constructor(private gestionnaire: GestionnairePeripherique) {
        this.fonctionsEnregistrees = [];
    }

    public ngOnDestroy(): void {
        this.desinscription();
    }

    public ajouterTouche(fonction: Function, evenement: IEvenement): void {
        const fonctionTouche: IFonctionPeripherique = {fonction, evenement};
        this.fonctionsEnregistrees.push(fonctionTouche);
        this.inscription(fonctionTouche);
    }

    private inscription(fonction: IFonctionPeripherique): void {
        this.gestionnaire.inscrire(fonction);
    }

    private desinscription(): void {
        for (const touche of this.fonctionsEnregistrees) {
            this.gestionnaire.desinscrire(touche);
        }
    }
}
