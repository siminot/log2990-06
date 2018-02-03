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

    public constructor(mot: MotAPI) {
        this.mot = mot.word;

        mot.defs !== undefined
            ? this.definitions = this.extraireDefinitions(mot.defs)
            : this.definitions = null;

        const NOMBRE_A_RETIRER = 2;
        this.frequence = Number(mot.tags[0].substring(NOMBRE_A_RETIRER, mot.tags[0].length - 1)); // Pour enlever le "/f" au debut
    }

    public possedeDefinition(): boolean {
        return this.definitions !== null;
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
            case "n": type = TypeMot.Nom; break;

            case "v": type = TypeMot.Verbe; break;

            case "adv": type = TypeMot.Adverbe; break;

            case "adj": type = TypeMot.Nom; break;

            default:
                throw Error("Type de mot inconnu");
        }

        return new Definition(type, def[1]);
    }

    public contientCaractereInvalide(): boolean {
        return new RegExp(Mot.CARACTERES_INVALIDES, "g").test(this.mot);
    }

    private trierDefinitionsNomOuVerbe(definitions: Definition[]): Definition[] {
        return this.definitions.filter((definition) => definition.estNomOuVerbe());
    }

    private trierDefinitionsSansLeMot(definitions: Definition[]): Definition[] {
        return this.definitions.filter((definition) => !definition.contient(this.mot));
    }

    public obtenirDefinitionsPourJeu(): Definition[] {
        let definitions: Definition[] = [];

        definitions = this.trierDefinitionsNomOuVerbe(this.definitions);

        return this.trierDefinitionsSansLeMot(definitions);
    }
}
