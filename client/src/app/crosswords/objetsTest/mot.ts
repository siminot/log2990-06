import { IMotGrille } from "../../../../../common/communication/IMotGrille";
import { IDefinition } from "../../../../../common/communication/IDefinition";

export class Mot implements IMotGrille {
    public mot: string;
    public definitions: IDefinition[];
    public estVertical: boolean;
    public longueur: number;
    public premierX: number;
    public premierY: number;
    public activer: boolean;
    public motTrouve: boolean;
    public cheat: boolean;

    public get definition(): string {
        return this.definitions[0].definition;
    }
}

export class LettreGrille {
    public caseDecouverte: boolean;
    public lettre: String;
    public lettreDecouverte: boolean;
}
