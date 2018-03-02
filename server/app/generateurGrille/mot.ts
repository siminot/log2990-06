import { IMot } from "../../../common/communication/IMot";
import { IDefinition } from "../../../common/communication/IDefinition";

const PAS_IMPORTANCE: number = 20;
const CARACTERE_INCONNU: string = "_";

export class Mot implements IMot {

    public mot: string;
    public definitions: IDefinition[];
    private estVertical: boolean;
    private longeur: number;
    private premierX: number;
    private premierY: number;
    private estTraite: boolean;

    public constructor(estVertical: boolean, longueur: number, premierX: number, premierY: number) {
        this.mot = "";
        this.definitions = [{definition: ""}];
        this.estVertical = estVertical;
        this.longeur = longueur;
        this.premierX = premierX;
        this.premierY = premierY;
        this.estTraite = false;

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
        return this.definitions[0].definition;
    }

    public getEstTraite(): boolean {
        return this.estTraite;
    }

    // setters
    public setMot(mot: string): void {
        this.mot = mot;
    }
    public setDefinition (definition: string): void {
        this.definitions[0].definition = definition;
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

    public estLieAvecAutreMot(autreMot: Mot): boolean {
        return !this.estMemeSens(autreMot) && this.coordonneeConcordent(autreMot);
    }

    private coordonneeConcordent(autreMot: Mot): boolean {
        return this.coordonneeFixeValide(autreMot) &&
               autreMot.coordonneeVariableValide(this);
    }

    private coordonneeVariableValide(autreMot: Mot): boolean {
        return this.coordonneeVariableMinAutreMot(autreMot) >= autreMot.coordonneeVariableMin  &&
               this.coordonneeVariableMinAutreMot(autreMot) <= autreMot.coordonneeVariableMax;
    }

    private coordonneeFixeValide(autreMot: Mot): boolean {
        return this.coordonneeFixe >= autreMot.coordonneeVariableMin  &&
               this.coordonneeFixe <= autreMot.coordonneeVariableMax;
    }

    private estMemeSens(autreMot: Mot): boolean {
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

    private coordonneeVariableMinAutreMot(autre: Mot): number {
        if (autre.estVertical) {
            return this.getPremierY();
        } else {
            return this.getPremierX();
        }
    }

    public getImportance(ancienMot: Mot): number {
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
