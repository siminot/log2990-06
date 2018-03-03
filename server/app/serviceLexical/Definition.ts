import { IDefinition } from "../../../common/communication/IDefinition";
import { TypeMot } from "./Mot";

export class Definition implements IDefinition {

    private static readonly PATRON_RECHERCHE: string = "[\b]?";

    public type: TypeMot;
    public definition: string;

    public constructor(type: TypeMot, definition: string) {
        this.type = type;
        this.definition = definition;
    }

    public contient(mot: string): boolean {
        const pattern: string = Definition.PATRON_RECHERCHE + mot.toLowerCase() + Definition.PATRON_RECHERCHE;

        return new RegExp(pattern, "g").test(this.definition.toLowerCase());
    }

    public estNomOuVerbe(): boolean {
        return this.type === TypeMot.Nom || this.type === TypeMot.Verbe;
    }
}
