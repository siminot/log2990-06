import { TypeMot } from "./Mot";

export class Definition {
    public type: TypeMot;
    public definition: string;

    public constructor(type: TypeMot, definition: string) {
        this.type = type;
        this.definition = definition;
    }

    public contient(mot: string): boolean {
        const pattern: string = "[\b]?" + mot + "[\b]?";

        return new RegExp(pattern, "g").test(this.definition);
    }

    public estNomOuVerbe(): boolean {
        return this.type === TypeMot.Nom || this.type === TypeMot.Verbe;
    }
}
