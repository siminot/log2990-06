const PAS_IMPORTANCE: number = 20;
const CARACTERE_INCONNU: string = "_";

export class Mockword {

    private mot: string;
    private definition: string;
    private estVertical: boolean;
    private longeur: number;
    private premierX: number;
    private premierY: number;
    private estTraite: boolean;
    private cheat:boolean;

    public constructor(estVertical: boolean, longueur: number, premierX: number, premierY: number) {
        this.mot = "";
        this.definition = "";
        this.estVertical = estVertical;
        this.longeur = longueur;
        this.premierX = premierX;
        this.premierY = premierY;
        this.estTraite = false;
        this.cheat = false; 

    }
    // getters
    public getVertical(): boolean {
        return this.estVertical;
    }

    public getLongueur(): number {
        return this.longeur;
    }

    public getPremierX(): number {
        return this.premierX;
    }

    public getPremierY(): number {
        return this.premierY;
    }

    public getMot(): string {
        return this.mot;
    }

    public getDefinition(): string {
        return this.definition;
    }

    public getEstTraite(): boolean {
        return this.estTraite;
    }

    // setters
    public setMot(mot: string): void {
        this.mot = mot;
    }
    public setDefinition (definition: string): void {
        this.definition = definition;
    }

    public setEstTraite(etat: boolean): void {
        this.estTraite = etat;
    }

    public inverserXY(): void {
        const temp: number = this.premierX;
        this.premierX = this .premierY;
        this.premierY = temp;
    }

    // autre

    public estLieAvecAutreMot(autreMot: Mockword): boolean {
        return !this.estMemeSens(autreMot) && this.coordonneeConcordent(autreMot);
    }

    private coordonneeConcordent(autreMot: Mockword): boolean {
        return this.coordonneeFixeValide(autreMot) &&
               autreMot.coordonneeVariableValide(this);
    }

    private coordonneeVariableValide(autreMot: Mockword): boolean {
        return this.coordonneeVariableMinAutreMot(autreMot) >= autreMot.coordonneeVariableMin  &&
               this.coordonneeVariableMinAutreMot(autreMot) <= autreMot.coordonneeVariableMax;
    }

    private coordonneeFixeValide(autreMot: Mockword): boolean {
        return this.coordonneeFixe >= autreMot.coordonneeVariableMin  &&
               this.coordonneeFixe <= autreMot.coordonneeVariableMax;
    }

    private estMemeSens(autreMot: Mockword): boolean {
        return this.getVertical() === autreMot.getVertical();
    }

    private get coordonneeVariableMin(): number {
        if (this.estVertical) {
            return this.getPremierY();
        } else {
            return this.getPremierX();
        }
    }

    private get coordonneeVariableMax(): number {
        return this.coordonneeVariableMin + this.getLongueur() - 1;
    }

    private get coordonneeFixe(): number {
        if (this.estVertical) {
            return this.getPremierX();
        } else {
            return this.getPremierY();
        }
    }

    private coordonneeVariableMinAutreMot(autre: Mockword): number {
        if (autre.estVertical) {
            return this.getPremierY();
        } else {
            return this.getPremierX();
        }
    }

    public getImportance(ancienMot: Mockword): number {
        let i: number = 0;
        for (const char of this.mot) {
            if (char !== CARACTERE_INCONNU) {
                i++;
            }
        }
        if (this.estLieAvecAutreMot(ancienMot)) {
            i += PAS_IMPORTANCE;
        }

        return i + this.mot.length;
    }
}
