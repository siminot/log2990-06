import { TAILLE_TEST, VIDE, NOIR, POURCENTAGE_TEST } from "./constantes";

export class GenerateurSquelette {

    private grille: Array<Array<string>>;
    private tailleGrille = TAILLE_TEST;

    public obtenirSqueletteGrille(): Array<Array<string>> {
        return this.grille;
    }

    public modifierLaTaille(nouvelleTaille: number): number {
        this.tailleGrille = nouvelleTaille;
        this.allocationDeLaGrille();

        return this.tailleGrille;
    }

    constructor() {
        this.allocationDeLaGrille();
        this.genererCasesNoires(POURCENTAGE_TEST);
    }

    private allocationDeLaGrille(): void {
        this.grille = new Array(this.tailleGrille).fill(VIDE);
        for (let i = 0; i < this.tailleGrille; i++) {
            this.grille[i] = new Array(this.tailleGrille).fill(VIDE);
        }
    }

    private genererCasesNoires(ratioVoulu: number): number {
        // Verifier une bonne entree
        if (ratioVoulu < 0 || ratioVoulu > 1) {
        return null;
        }

        const nombreCases = Math.ceil(this.tailleGrille * this.tailleGrille * ratioVoulu);
        let compteurCasesNoires = 0;
        let x = 0;
        let y = 0;

        while (compteurCasesNoires < nombreCases) {
            // On genere une position aleatoire
            x = Math.floor(Math.random() * this.tailleGrille);
            y = Math.floor(Math.random() * this.tailleGrille);
            if (this.verifCaseNoire(x, y)) {
                this.grille[y][x] = NOIR;
                compteurCasesNoires++;
            }
        }

        return nombreCases;
    }

    private verifCaseNoire(positionX: number, positionY: number): boolean {

        if (this.grille[positionY][positionX] === NOIR) {
            return false;
        }

        this.grille[positionY][positionX] = NOIR;
        let caseDisponible = true;

        caseDisponible = this.neGenerePasDeTrou(positionX - 1, positionY);
        if (caseDisponible) {
            caseDisponible = this.neGenerePasDeTrou(positionX + 1, positionY);
        }
        if (caseDisponible) {
            caseDisponible = this.neGenerePasDeTrou(positionX, positionY - 1);
        }
        if (caseDisponible) {
            caseDisponible = this.neGenerePasDeTrou(positionX, positionY + 1);
        }

        this.grille[positionY][positionX] = VIDE;

        return caseDisponible;
    }

    private neGenerePasDeTrou(positionX: number, positionY: number): boolean {

        if (positionX < 0 || positionY < 0 || positionX >= this.tailleGrille || positionY >= this.tailleGrille ) {
            return true;
        }
        if (this.grille[positionY][positionX] === NOIR) {
            return true;
        }
        if (positionY - 1 > 0) {
            if (this.grille[positionY - 1][positionY] === VIDE) {
                return true;
            }
        }
        if (positionY + 1 < this.tailleGrille) {
            if (this.grille[positionY + 1][positionX] === VIDE) {
                return true;
            }
        }
        if (positionX - 1 > 0) {
            if (this.grille[positionY][positionX - 1] === VIDE) {
                return true;
            }
        }
        if (positionX + 1 < this.tailleGrille) {
            if (this.grille[positionY][positionX + 1] === VIDE) {
                return true;
            }
        }

        return false;
    }

}
