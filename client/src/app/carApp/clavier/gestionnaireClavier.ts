import { Injectable } from "@angular/core";
import { EvenementClavier, TypeEvenementClavier } from "./evenementClavier";
import { GestionnairePeripherique } from "../peripheriques/GestionnairePeripherique";
import { ConteneurFonctionsClavier } from "./conteneurFonctionsClavier";

@Injectable()
export class GestionnaireClavier extends GestionnairePeripherique {

    protected listeRappel: ConteneurFonctionsClavier;
    protected evenementRecu: KeyboardEvent;

    public constructor() {
        super();
        this.listeRappel = new ConteneurFonctionsClavier();
        this.evenementRecu = null;
    }

    public toucheAppuyee(evenement: KeyboardEvent): void {
        this.evenementRecu = evenement;
        this.notifier(new EvenementClavier(evenement.key, TypeEvenementClavier.TOUCHE_APPUYEE));
    }

    public toucheRelevee(evenement: KeyboardEvent): void {
        this.evenementRecu = evenement;
        this.notifier(new EvenementClavier(evenement.key, TypeEvenementClavier.TOUCHE_RELEVEE));
    }

    public touchePressee(evenement: KeyboardEvent): void {
        this.evenementRecu = evenement;
        this.notifier(new EvenementClavier(evenement.key, TypeEvenementClavier.TOUCHE_PRESSEE));
    }
}
