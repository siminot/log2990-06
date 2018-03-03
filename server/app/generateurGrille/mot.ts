import { IMot } from "../../../common/communication/IMot";
import { IDefinition } from "../../../common/communication/IDefinition";
import { IMotGrille } from "../../../common/communication/IMotGrille";

const PAS_IMPORTANCE: number = 20;
const CARACTERE_INCONNU: string = "_";

export class MotBase implements IMot {
    public mot: string;
    public definitions: IDefinition[];
}

export class Mot extends MotBase implements IMotGrille {

    public estTraite: boolean;
    public estVertical: boolean;
    public longueur: number;
    public premierX: number;
    public premierY: number;

    public constructor(estVertical: boolean, longueur: number, premierX: number, premierY: number) {
        super();
        this.mot = "";
        this.definitions = [{definition: ""}];
        this.estVertical = estVertical;
        this.longueur = longueur;
        this.premierX = premierX;
        this.premierY = premierY;
        this.estTraite = false;

    }

    public inverserXY(): void {
        const temp: number = this.premierX;
        this.premierX = this .premierY;
        this.premierY = temp;
    }

    public estLieAvecAutreMot(autreMot: Mot): boolean {
        return !this.estMemeSens(autreMot) && this.coordonneeConcordent(autreMot);
    }

    private coordonneeConcordent(autreMot: Mot): boolean {
        return this.coordonneeFixeValide(autreMot) &&
               autreMot.coordonneeVariableValide(this);
    }

    private coordonneeVariableValide(autreMot: Mot): boolean {
        return this.coordonneeVariableMinAutreMot(autreMot) >= autreMot.coordonneeVariableMin &&
               this.coordonneeVariableMinAutreMot(autreMot) <= autreMot.coordonneeVariableMax;
    }

    private coordonneeFixeValide(autreMot: Mot): boolean {
        return this.coordonneeFixe >= autreMot.coordonneeVariableMin &&
               this.coordonneeFixe <= autreMot.coordonneeVariableMax;
    }

    private estMemeSens(autreMot: Mot): boolean {
        return this.estVertical === autreMot.estVertical;
    }

    private get coordonneeVariableMin(): number {
        return this.estVertical
            ? this.premierY
            : this.premierX;
    }

    private get coordonneeVariableMax(): number {
        return this.coordonneeVariableMin + this.longueur - 1;
    }

    private get coordonneeFixe(): number {
        return this.estVertical
            ? this.premierX
            : this.premierY;
    }

    private coordonneeVariableMinAutreMot(autre: Mot): number {
        return autre.estVertical
            ? this.premierY
            : this.premierX;
    }

    public getImportance(ancienMot: Mot): number {
        let importance: number = this.nombreLettresConnues() + this.mot.length;
        if (this.estLieAvecAutreMot(ancienMot)) {
            importance += PAS_IMPORTANCE;
        }

        return importance;
    }

    private nombreLettresConnues(): number {
        let compteur: number = 0;
        for (const char of this.mot) {
            if (char !== CARACTERE_INCONNU) {
                compteur++;
            }
        }

        return compteur;
    }
}
