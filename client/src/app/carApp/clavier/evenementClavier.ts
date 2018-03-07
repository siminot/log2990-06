import { IEvenement } from "../peripheriques/IEvenement";
import { IFonctionPeripherique } from "../peripheriques/IFonctionPeripherique";

export enum TypeEvenementClavier { TOUCHE_APPUYEE, TOUCHE_RELEVEE, TOUCHE_PRESSEE }

export class EvenementClavier implements IEvenement {
    public touche: string;
    public type: TypeEvenementClavier;

    public constructor(touche: string, type: TypeEvenementClavier) {
        this.touche = touche;
        this.type = type;
    }
}

export class FonctionTouche implements IFonctionPeripherique {
    public fonction: Function;
    public evenement: EvenementClavier;

    public constructor(fonction: Function, evenement: EvenementClavier) {
        this.fonction = fonction;
        this.evenement = evenement;
    }
}
