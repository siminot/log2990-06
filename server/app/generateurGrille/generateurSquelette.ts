import { VIDE, NOIR } from "./constantes";

export class GenerateurSquelette {

    private grille: Array<Array<string>>;
    private tailleGrille: number;
    private pourcentageCasesNoires: number;
    private compteurCasesNoires: number;

    constructor(tailleGrille: number, pourcentageDeCasesNoires: number) {
        this.tailleGrille = tailleGrille;
        this.pourcentageCasesNoires = pourcentageDeCasesNoires;
        this.compteurCasesNoires = 0;
    }

    public getSqueletteGrille(): Array<Array<string>> {
        this.genererNouvelleGrille();

        return this.grille;
    }

    public getTailleGrille(): number {
        return this.tailleGrille;
    }

    private genererNouvelleGrille(): void {
        this.compteurCasesNoires = 0;
        this.allocationDeLaGrille();
        this.genererMotifInitial();
        this.genererCasesNoires(this.pourcentageCasesNoires);
    }

    private allocationDeLaGrille(): void {
        this.grille = new Array(this.tailleGrille).fill(VIDE);
        for (let i = 0; i < this.tailleGrille; i++) {
            this.grille[i] = new Array(this.tailleGrille).fill(VIDE);
        }
    }

    private genererMotifInitial(): void {
        for (let i = 1; i < this.tailleGrille; i += 2) {
            for (let j = 1; j < this.tailleGrille; j += 2) {
                this.grille[i][j] = NOIR;
                this.compteurCasesNoires++;
            }
        }
        /*for (let y = 1; y < this.tailleGrille; y += 2) {
            let x: number;
            do {
                x = this.nombreAleatoire(5) * 2 + 1;
            } while (this.grille[y][x] === VIDE);
            this.grille[y][x] = VIDE;
            }

        for (let x = 1; x < this.tailleGrille; x += 2) {
            let y: number;
            do {
               y = this.nombreAleatoire(5) * 2 + 1;
            } while (this.grille[y][x] === VIDE);
            this.grille[y][x] = VIDE;
        }*/
    }

    /*private nombreAleatoire(nbMax: number): number {
        const millisecondes = new Date().getMilliseconds();
        const MILLE = 1000;

        return Math.floor(millisecondes * nbMax / MILLE);
    }*/

    private genererCasesNoires(ratioVoulu: number): number {
        // Verifier une bonne entree
        if (ratioVoulu < 0 || ratioVoulu > 1) {
        return null;
        }

        const nombreCases = Math.ceil(this.tailleGrille * this.tailleGrille * ratioVoulu);

        let x = 0;
        let y = 0;

        while (this.compteurCasesNoires < nombreCases) {
            // On genere une position aleatoire
            x = Math.floor(Math.random() * this.tailleGrille);
            y = Math.floor(Math.random() * this.tailleGrille);
            if (this.verifCaseNoire(x, y)) {
                this.grille[y][x] = NOIR;
                this.compteurCasesNoires++;
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
