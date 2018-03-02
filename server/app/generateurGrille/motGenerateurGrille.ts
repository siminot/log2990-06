const CARACTERE_INCONNU: string = "_";

export class MotGenerationGrille {

    private _mot: string;
    private _definition: string;
    private _estVertical: boolean;
    private _longueur: number;
    private _premierX: number;
    private _premierY: number;
    private _estTraite: boolean;

    public constructor(estVertical: boolean, longueur: number, premierX: number, premierY: number) {
        this._mot = "";
        this._definition = "";
        this._estVertical = estVertical;
        this._longueur = longueur;
        this._premierX = premierX;
        this._premierY = premierY;
        this._estTraite = false;

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

    public get mot(): string {
        return this._mot;
    }

    public set mot(mot: string) {
        this._mot = mot;
    }

    public get definition(): string {
        return this._definition;
    }

    public set definition(definition: string) {
        this.definition = definition;
    }

    public get estTraite(): boolean {
        return this._estTraite;
    }

    public setEstTraite(etat: boolean): void {
        this._estTraite = etat;
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
