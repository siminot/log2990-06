export class Word {
    public mot: string;
    public definition: string;
    public vertical: boolean;
    public longeur: number;
    public premierX: number;
    public premierY: number;
    public activer: boolean;
    public motTrouve: boolean;
}

export class LettreGrille {
    public caseDecouverte: boolean;
    public lettre: String;
    public lettreDecouverte: boolean;
}
