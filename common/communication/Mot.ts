//import { Difficulte } from "./Difficulte";

export enum Frequence { Commun, NonCommun};

export enum TypeMot { Nom, Verbe, Adjectif, Adverbe};

export class Mot {
    public mot : String;
    public definitions : Definition[];
    private frequence : number;

    private static readonly MEDIANE_FREQUENCE = 80;

    public constructor(mot : string, definitions : Array<string>, frequence : string) { 
        this.mot = mot;

        if(definitions !== undefined)
            this.definitions = this.extraireDefinitions(definitions);
            
        this.frequence = Number(frequence.substring(2, frequence.length-1)); //Pour enlever le "/f" au debut
    }
    
    public obtenirLeMot(): String {
        return this.mot;
    }

    public possedeDefinition() : boolean {
        return this.definitions !== undefined;
    }

    public obtenirFrequence() : Frequence {
        return this.frequence > Mot.MEDIANE_FREQUENCE ? Frequence.Commun : Frequence.NonCommun;
    }

    private extraireDefinitions(definitions : Array<string>) : Definition[] {
        let tableau : Definition[] = [];
        
        for(let i = 0 ; i < definitions.length ; i++)
            tableau.push(this.creerDefinition(definitions[i]))

        return tableau;
    }

    private creerDefinition(definition : string) : Definition {
        let def : Array<string> = definition.split("\t", 2);
        let type : TypeMot;
        switch(def[0]){
            case "n" : type = TypeMot.Nom;
                break;
            
            case "v" : type = TypeMot.Verbe;
                break;
            
            case "adv" : type = TypeMot.Adverbe;
                break;
            
            case "adj" : type = TypeMot.Nom;
                break;
            
            default:
                throw Error("Type de mot inconnu");
        }

        return new Definition(type, def[1]);
    }
}

export class Definition {
    public type : TypeMot;
    public definition : string;

    public constructor(type : TypeMot, definition : string){
        this.type = type;
        this.definition = definition;

    }
}
