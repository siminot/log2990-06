import { VIDE, NOIR, TAILLE_TABLEAU } from "./constantes";
const NB_MOTS = 15;
const CENT_POURCENT = 100;

export class MotSquelette {
    private _longueur: number;
    private _verticalite: boolean;
    private _index: number;

    constructor() {
        this._longueur = this.genererTailleMotAleatoire();
        this._verticalite = Math.floor(Math.random()) > 0;
        this._index = Math.floor(Math.random() * TAILLE_TABLEAU);
    }

    private genererTailleMotAleatoire() {
         const nbAleatoire = Math.floor(Math.random() * CENT_POURCENT);
           // tslint:disable: no-magic-numbers
         if (nbAleatoire < 4) {
            return 2; // 5 %
         } else if (nbAleatoire < 14) {
            return 3; // 10 %
         } else if (nbAleatoire < 29) {
            return 4; // 15 %
         } else if (nbAleatoire < 49) {
            return 5; // 20 %
         } else if (nbAleatoire < 64) {
            return 6; // 15 %
         } else if (nbAleatoire < 74) {
             return 7; // 10 %
         } else if (nbAleatoire < 84) {
             return 8; // 10%
         } else if (nbAleatoire < 94) {
             return 9; // 10%
         } else {
             return 10; // 5%
         }
         // tslint:enable: no-magic-numbers
    }

    public get longueur() {
        return this._longueur;
    }
    public get verticalite() {
        return this._verticalite;
    }
    public get index() {
        return this._verticalite;
    }

}

export class GenerateurSquelette {

    private grille: Array<Array<string>>;
    private compteurMotsParX: Array<number>;
    private compteurMotsParY: Array<number>;
    private motSquelette: MotSquelette;
    private tailleGrille: number;
    private randomCasesNoires: number;
    private compteurCasesNoires: number;

    constructor(tailleGrille: number, randomDeCasesNoires: number) {
        this.tailleGrille = tailleGrille;
        this.randomCasesNoires = randomDeCasesNoires;
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
        this.genererCasesNoires(this.randomCasesNoires);
    }

    private allocationDeLaGrille(): void {
        this.grille = new Array(this.tailleGrille).fill(NOIR);
        for (let i = 0; i < this.tailleGrille; i++) {
            this.grille[i] = new Array(this.tailleGrille).fill(NOIR);
        }
        for (let i = 0; i < this.tailleGrille; i++) {
            this.compteurMotsParX = new Array(this.tailleGrille).fill(0);
            this.compteurMotsParY = new Array(this.tailleGrille).fill(0);
        }
    }

    private remplirLaGrilleDeMotsVides(): void {
        for ( let i = 0; i < NB_MOTS; i++) {
            this.motSquelette = new MotSquelette();
            if (this.estEmplacementValide()) {

            }
        }
    }


    private estEmplacementValide(): boolean {

        let compteurMotsParalleles: Array<number>;
        verticalite ? compteurMotsParalleles = this.compteurMotsParX : compteurMotsParalleles = this.compteurMotsParY;

        if ( index === 0 || compteurMotsParalleles[index - 1] === 0) {
            if (index === this.tailleGrille - 1 || compteurMotsParalleles[index + 1] === 0) {
                return true;
            }
        }

        return false;
    }

    private rajouterMotVide( longueurMot: number): boolean {

                let nbMotsPourCetteLigne = compteurMotsParalleles[index];

                if (nbMotsPourCetteLigne === 0) {
                    if (verticalite) {
                        for (let i = 0; i < longueurLigne; i++) {
                            this.grille[i][index] = VIDE;
                        }
                    } else {
                        for (let i = 0; i < longueurLigne; i++) {
                            this.grille[index][i] = VIDE;
                        }
                    }
                    nbMotsPourCetteLigne++;

                } else if (nbMotsPourCetteLigne === 1) {
                    if (verticalite) {
                        let i = 0;
                        while (this.grille[i][index] === VIDE) {
                            i++;
                        }
                        // Faire attention on peut depasser la grille
                        while (i < longueurLigne) {
                            this.grille[i][index] = VIDE;
                            i++;
                        }
                    } else {
                        let i = 0;
                        while (this.grille[index][i] === VIDE) {
                            i++;
                        }
                        // Faire attention on peut depasser la grille
                        while (i < longueurLigne) {
                            this.grille[index][i] = VIDE;
                            i++;

                    }
                } else {

                }
            }
        }
        return false;
    }

    private genererMotifInitial(): void {
        for (let i = 1; i < this.tailleGrille; i += 2) {
            for (let j = 1; j < this.tailleGrille; j += 2) {
                this.grille[i][j] = NOIR;
                this.compteurCasesNoires++;
            }
        }
    }

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
            if (this.grille[positionY - 1][positionX] === VIDE) {
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
