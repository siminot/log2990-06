import { Injectable } from "@angular/core";
import { IFonctionPeripherique } from "./IFonctionPeripherique";
import { IEvenement } from "./IEvenement";
import { ConteneurFonctions } from "./ConteneurFonctions";

@Injectable()
export abstract class GestionnairePeripherique {

    protected listeRappel: ConteneurFonctions;
    protected evenementRecu: UIEvent;

    public inscrire(inscription: IFonctionPeripherique): void {
        this.listeRappel.ajouter(inscription);
    }

    public desinscrire(desinscription: IFonctionPeripherique): void {
        this.listeRappel.retirer(desinscription);
    }

    protected notifier(evenement: IEvenement): void {
        for (const fonction of this.listeRappel.obtenirFonctions(evenement)) {
            fonction();
        }
    }
}
