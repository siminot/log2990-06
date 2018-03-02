export enum TypeEvenementClavier { TOUCHE_APPUYEE, TOUCHE_RELEVEE }

export class EvenementClavier {
    public touche: string;
    public type: TypeEvenementClavier;

    public constructor(touche: string, type: TypeEvenementClavier) {
        this.touche = touche;
        this.type = type;
    }
}

export class FonctionTouche {
    public fonction: Function;
    public evenementClavier: EvenementClavier;

    public constructor(fonction: Function, evenement: EvenementClavier) {
        this.fonction = fonction;
        this.evenementClavier = evenement;
    }
}
