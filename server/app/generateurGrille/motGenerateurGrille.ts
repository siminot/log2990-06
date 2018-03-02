const CARACTERE_INCONNU: string = "_";

export class MotGenerationGrille {

    public mot: string;
    public definition: string;
    private _estVertical: boolean;
    private _longueur: number;
    private _premierX: number;
    private _premierY: number;
    public estTraite: boolean;

    public constructor(estVertical: boolean, longueur: number, premierX: number, premierY: number) {
        this.mot = "";
        this.definition = "";
        this._estVertical = estVertical;
        this._longueur = longueur;
        this._premierX = premierX;
        this._premierY = premierY;
        this.estTraite = false;

    }
    // getters
    public get estVertical(): boolean {
        return this._estVertical;
    }

    public get longueur(): number {
        return this._longueur;
    }

    public get premierX(): number {
        return this._premierX;
    }

    public get premierY(): number {
        return this._premierY;
    }

    public inverserXY(): void {
        const temp: number = this.premierX;
        this._premierX = this .premierY;
        this._premierY = temp;
    }

    // autre

    public estLieAvecAutreMot(autreMot: MotGenerationGrille): boolean {
        return !this.estMemeSens(autreMot) && this.coordonneeConcordent(autreMot);
    }

    private coordonneeConcordent(autreMot: MotGenerationGrille): boolean {
        return this.coordonneeFixeValide(autreMot) &&
               autreMot.coordonneeVariableValide(this);
    }

    private coordonneeVariableValide(autreMot: MotGenerationGrille): boolean {
        return this.coordonneeVariableMinAutreMot(autreMot) >= autreMot.coordonneeVariableMin  &&
               this.coordonneeVariableMinAutreMot(autreMot) <= autreMot.coordonneeVariableMax;
    }

    private coordonneeFixeValide(autreMot: MotGenerationGrille): boolean {
        return this.coordonneeFixe >= autreMot.coordonneeVariableMin  &&
               this.coordonneeFixe <= autreMot.coordonneeVariableMax;
    }

    private estMemeSens(autreMot: MotGenerationGrille): boolean {
        return this.estVertical === autreMot.estVertical;
    }

    private get coordonneeVariableMin(): number {
        if (this.estVertical) {
            return this.premierY;
        } else {
            return this.premierX;
        }
    }

    private get coordonneeVariableMax(): number {
        return this.coordonneeVariableMin + this.longueur - 1;
    }

    private get coordonneeFixe(): number {
        if (this.estVertical) {
            return this.premierX;
        } else {
            return this.premierY;
        }
    }

    private coordonneeVariableMinAutreMot(autre: MotGenerationGrille): number {
        if (autre.estVertical) {
            return this.premierY;
        } else {
            return this.premierX;
        }
    }

    public getImportance(ancienMot: MotGenerationGrille): number {
        let i: number = 0;
        for (const char of this.mot) {
            if (char !== CARACTERE_INCONNU) {
                i++;
            }
        }
        if (this.estLieAvecAutreMot(ancienMot)) {
            const PAS_IMPORTANCE: number = 20;
            i += PAS_IMPORTANCE;
        }

        return i + this.mot.length;
    }
}
