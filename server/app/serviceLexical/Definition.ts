import { TypeMot } from "./Mot";

export class Definition {
    public type: TypeMot;
    public definition: string;

    public constructor(type: TypeMot, definition: string) {
        this.type = type;
        this.definition = definition;
    }

    public contient(mot: string): boolean {
        return this.definition.indexOf(" " + mot + " ") >= 0 || this.definition.substring(0, mot.length) === mot;

        /* Essai d'utiliser une expression reguliere
        const pattern: string = "[^\w]?^" + mot + "[[^\w]";
        return new RegExp("\d*", "g").test(this.definition); */
    }

    public estNomOuVerbe(): boolean {
        return this.type === TypeMot.Nom || this.type === TypeMot.Verbe;
    }
}
