import { Difficulte } from "./Difficulte";

export enum Frequence { Faible, Elevee};

export class Mot {
    public mot : string;
    public definitions : Array<string>;
    private frequence : number;

    private MEDIANE_FREQUENCE = 0.50;

    public constructor(mot : string, definitions : Array<string>, frequence : number) { 
        this.mot = mot;
        this.definitions = definitions;
        this.frequence = frequence
    }
    
    public possedeDefinition() : boolean {
        return this.definitions !== undefined;
    }

    public obtenirFrequence() : Frequence {
        if(this.frequence < this.MEDIANE_FREQUENCE)
            return Frequence.Faible;
        else
            return Frequence.Elevee;

    }

}