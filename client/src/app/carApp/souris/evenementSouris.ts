import { IFonctionPeripherique } from "../peripheriques/IFonctionPeripherique";
import { IEvenement } from "../peripheriques/IEvenement";

export enum TypeEvenementSouris { CLICK, MOUSEOVER, MOUSEDOWN, MOUSEUP, DOUBLECLICK, DRAG, DRAGOVER }

export class EvenementSouris implements IEvenement {
    public type: TypeEvenementSouris;

    public constructor(type: TypeEvenementSouris) {
        this.type = type;
    }
}

export class FonctionSouris implements IFonctionPeripherique {
    public fonction: Function;
    public evenement: EvenementSouris;

    public constructor(fonction: Function, evenement: EvenementSouris) {
        this.fonction = fonction;
        this.evenement = evenement;
    }
}
