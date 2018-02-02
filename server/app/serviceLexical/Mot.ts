import { Definition } from "./Definition";

export enum Frequence { Commun, NonCommun}
export enum TypeMot { Nom, Verbe, Adjectif, Adverbe}

export class Mot {
    private static readonly MEDIANE_FREQUENCE = 80;

    public mot: string;
    public definitions: Definition[];
    private frequence: number;

    public constructor(mot: string, definitions: Array<string>, frequence: string) {
        this.mot = mot;

        if (definitions !== undefined) {
            this.definitions = this.extraireDefinitions(definitions);
        }
        const NOMBRE_A_RETIRER = 2;
        this.frequence = Number(frequence.substring(NOMBRE_A_RETIRER, frequence.length - 1)); // Pour enlever le "/f" au debut
    }

    public possedeDefinition(): boolean {
        return this.definitions !== undefined;
    }

    public obtenirFrequence(): Frequence {
        return this.frequence > Mot.MEDIANE_FREQUENCE ? Frequence.Commun : Frequence.NonCommun;
    }

    private extraireDefinitions(definitions: Array<String>): Definition[] {
        const tableau: Definition[] = [];

        for (const def of definitions) {
            tableau.push(this.creerDefinition(def));
        }

        return tableau;
    }

    private creerDefinition(definition: String): Definition {
        const NOMBRE_DIVISION = 2;
        const def: Array<string> = definition.split("\t", NOMBRE_DIVISION);
        let type: TypeMot;
        switch (def[0]) {
            case "n" : type = TypeMot.Nom; break;

            case "v" : type = TypeMot.Verbe; break;

            case "adv" : type = TypeMot.Adverbe; break;

            case "adj" : type = TypeMot.Nom; break;

            default:
                throw Error("Type de mot inconnu");
        }

        return new Definition(type, def[1]);
    }
}
