import { Definition } from "./Definition";
import { MotAPI } from "./MotAPI";

export enum Frequence { Commun, NonCommun }
export enum TypeMot { Nom, Verbe, Adjectif, Adverbe }

export class Mot {
    private static readonly MEDIANE_FREQUENCE: number = 80;

    // Pour détecter ce qui n'est pas un lettre majuscule/minuscule/accentuée
    private static readonly CARACTERES_INVALIDES: string = "[^A-Z|^a-z]";

    public mot: string;
    public definitions: Definition[];
    private frequence: number;

    // Construction d'un mot

    public constructor(mot: MotAPI) {
        mot.word !== undefined
            ? this.mot = mot.word
            : this.mot = null;

        this.definitions = this.extraireDefinitions(mot.defs);

        this.frequence = this.extraireFrequence(mot.tags[MotAPI.TAG_INDICE_FREQUENCE]);
    }

    private extraireDefinitions(definitions: Array<String>): Definition[] {
        if (definitions === undefined) {
            return null;
        }

        const tableau: Definition[] = [];

        for (const def of definitions) {
            const DEFINITION: Definition = this.creerDefinition(def);

            if (DEFINITION !== null) {
                tableau.push(DEFINITION);
            }
        }

        return tableau;
    }

    private creerDefinition(definition: String): Definition {
        const NOMBRE_DIVISION: number  = 2;
        const def: Array<string> = definition.split(MotAPI.SEPARATEUR_DEFINITION, NOMBRE_DIVISION);
        let type: TypeMot;
        switch (def[0]) {
            case "n": type = TypeMot.Nom; break;

            case "v": type = TypeMot.Verbe; break;

            case "adv": type = TypeMot.Adverbe; break;

            case "adj": type = TypeMot.Adjectif; break;

            default:
                return null;
        }

        return new Definition(type, def[1]);
    }

    private extraireFrequence(frequence: string): number {
        if (frequence === undefined) {
            return null;
        }

        // Pour obtenir le "f:" au debut
        const NOMBRE_A_RETIRER: number = MotAPI.MARQUEUR_FREQUENCE.length;
        const TAG_FREQUENCE: string = frequence.substring(0, NOMBRE_A_RETIRER);

        const FREQUENCE: number = Number.parseInt(frequence.substring(NOMBRE_A_RETIRER));

        if (TAG_FREQUENCE === MotAPI.MARQUEUR_FREQUENCE && !isNaN(FREQUENCE)) {
            return FREQUENCE;
        } else {
            return null;
        }
    }

    // Méthodes publiques

    public possedeDefinition(): boolean {
        return this.definitions !== null;
    }

    public obtenirFrequence(): Frequence {
        if (this.frequence !== null) {
            return this.frequence >= Mot.MEDIANE_FREQUENCE
                ? Frequence.Commun
                : Frequence.NonCommun;
        } else {
            return null;
        }
    }

    public contientCaractereInvalide(): boolean {
        return new RegExp(Mot.CARACTERES_INVALIDES, "g").test(this.mot);
    }

    public obtenirDefinitionsPourJeu(): Definition[] {
        let definitions: Definition[] = [];

        definitions = this.trierDefinitionsNomOuVerbe(this.definitions);

        return this.trierDefinitionsSansLeMot(definitions);
    }

    // Tri des définitions

    private trierDefinitionsNomOuVerbe(definitions: Definition[]): Definition[] {
        return this.definitions.filter((definition: Definition) => definition.estNomOuVerbe());
    }

    private trierDefinitionsSansLeMot(definitions: Definition[]): Definition[] {
        return this.definitions.filter((definition: Definition) => !definition.contient(this.mot));
    }
}
