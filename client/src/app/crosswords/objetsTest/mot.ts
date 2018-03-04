import { IMotGrille } from "../../../../../common/communication/IMotGrille";
import { IDefinition } from "../../../../../common/communication/IDefinition";

export class DefinitionBase implements IDefinition {
    public definition: string;

    public constructor(definition: string) {
        this.definition = definition;
    }
}

export class Mot implements IMotGrille {
    public mot: string;
    public definitions: DefinitionBase[];
    public estVertical: boolean;
    public longueur: number;
    public premierX: number;
    public premierY: number;
    public activer: boolean;
    public motTrouve: boolean;
    public cheat: boolean;
    public positionsLettres: string[];
}
