import { Injectable } from "@angular/core";
import { GestionnairePeripherique } from "../peripheriques/GestionnairePeripherique";
import { ConteneurFonctionSouris } from "./conteneurFonctionsSouris";
import { EvenementSouris, TypeEvenementSouris } from "./evenementSouris";

@Injectable()
export class GestionnaireSouris extends GestionnairePeripherique {

    protected listeRappel: ConteneurFonctionSouris;
    protected evenementRecu: MouseEvent;

    public constructor() {
        super();
        this.listeRappel = new ConteneurFonctionSouris();
        this.evenementRecu = null;
    }

    public sourisCliquee(evenement: MouseEvent): void {
        this.evenementRecu = evenement;
        this.notifier(new EvenementSouris(TypeEvenementSouris.CLICK));
    }

    public sourisSur(evenement: MouseEvent): void {
        this.evenementRecu = evenement;
        this.notifier(new EvenementSouris(TypeEvenementSouris.MOUSEOVER));
    }

    public sourisDeplaceeHaut(evenement: MouseEvent): void {
        this.evenementRecu = evenement;
        this.notifier(new EvenementSouris(TypeEvenementSouris.MOUSEUP));
    }

    public sourisDeplaceeBas(evenement: MouseEvent): void {
        this.evenementRecu = evenement;
        this.notifier(new EvenementSouris(TypeEvenementSouris.MOUSEDOWN));
    }

    public sourisDoubleCliquee(evenement: MouseEvent): void {
        this.evenementRecu = evenement;
        this.notifier(new EvenementSouris(TypeEvenementSouris.DOUBLECLICK));
    }

    public sourisDeplacement(evenement: MouseEvent): void {
        this.evenementRecu = evenement;
        this.notifier(new EvenementSouris(TypeEvenementSouris.DRAG));
    }

    public sourisDeplacementSur(evenement: MouseEvent): void {
        this.evenementRecu = evenement;
        this.notifier(new EvenementSouris(TypeEvenementSouris.DRAGOVER));
    }

    protected notifier(evenement: EvenementSouris): void {
        for (const fonction of this.listeRappel.obtenirFonctions(evenement)) {
            fonction(this.evenementRecu);
        }
    }
}
