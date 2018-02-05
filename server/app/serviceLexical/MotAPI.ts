export class MotAPI {
    public static readonly MARQUEUR_FREQUENCE: string = "f:" ;
    public static readonly SEPARATEUR_DEFINITION: string = "\t";
    public static readonly TAG_INDICE_FREQUENCE: number = 0;

    public word: string;
    public score: number;
    public tags: Array<string>;
    public defs: Array<string>;
}
