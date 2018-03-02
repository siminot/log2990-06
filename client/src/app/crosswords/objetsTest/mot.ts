export class Mot {
    public mot: string;
    public definition: string;
    public estVertical: boolean;
    public longeur: number;
    public premierX: number;
    public premierY: number;
    public activer: boolean;
    public motTrouve: boolean;
    public cheat: boolean;
    public positionsLettres: string[];
}

export class LettreGrille {
    public caseDecouverte: boolean;
    public lettre: String;
    public lettreDecouverte: boolean;
}
