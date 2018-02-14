import { Definition } from "./Definition";
import { MotAPI } from "./MotAPI";
// import { define } from "mime";

export enum Frequence { Commun, NonCommun }
export enum TypeMot { Nom, Verbe, Adjectif, Adverbe }

// tslint:disable-next-line:no-magic-numbers
const MEDIANE_FREQUENCE: number[] = [0, 0, 10, 10, 10, 10, 10, 5, 2, 2, 2];
const MEDIANE_FREQUENCE_DEFAUT = 80;

// Pour détecter ce qui n'est pas un lettre majuscule/minuscule/accentuée
const CARACTERES_INVALIDES = "[^A-Z|^a-z]";

export class Mot {

    public mot: string;
    public definitions: Definition[];
    public frequence: number;

    // Construction d'un mot

    public constructor(mot: MotAPI) {
        this.mot = null;
        if (mot.word !== undefined) {
            this.mot = mot.word;
        }

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
        const NOMBRE_DIVISION = 2;
        const DEFINITION: Array<string> = definition.split(MotAPI.SEPARATEUR_DEFINITION, NOMBRE_DIVISION);
        let type: TypeMot;
        switch (DEFINITION[0]) {
            case "n": type = TypeMot.Nom; break;

            case "v": type = TypeMot.Verbe; break;

            case "adv": type = TypeMot.Adverbe; break;

            case "adj": type = TypeMot.Adjectif; break;

            default:
                return null;
        }

        return new Definition(type, DEFINITION[1]);
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
            let frequenceComparaison: number;

            this.mot.length > MEDIANE_FREQUENCE.length
                ? frequenceComparaison = MEDIANE_FREQUENCE_DEFAUT
                : frequenceComparaison = MEDIANE_FREQUENCE[this.mot.length];

            return this.frequence >= frequenceComparaison
                ? Frequence.Commun
                : Frequence.NonCommun;
        } else {
            return null;
        }
    }

    public contientCaractereInvalide(): boolean {
        return new RegExp(CARACTERES_INVALIDES, "g").test(this.mot);
    }

    public obtenirDefinitionsPourJeu(): Definition[] {
        this.trierDefinitionsSansLeMot();
        this.trierDefinitionsNomOuVerbe();

        return this.definitions;
    }

    // Tri des définitions

    private trierDefinitionsNomOuVerbe(): void {
        if (this.definitions !== null) {
            this.definitions = this.definitions.filter((definition: Definition) => definition.estNomOuVerbe());
        }
    }

    private trierDefinitionsSansLeMot(): void {
        if (this.definitions !== null) {
            this.definitions = this.definitions.filter((definition: Definition) => !definition.contient(this.mot));
        }
    }
}
