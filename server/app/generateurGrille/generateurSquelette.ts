import { VIDE, NOIR, TAILLE_TABLEAU } from "./constantes";
const NB_MOTS = 15;
const CENT_POURCENT = 100;
const DEUX = 2;

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
        return this._index;
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
                this.rajouterMotSquelette();
            }
        }
    }

    private estEmplacementValide(): boolean {

        let compteurMotsParalleles: Array<number>;
        this.motSquelette.verticalite ? compteurMotsParalleles = this.compteurMotsParX : compteurMotsParalleles = this.compteurMotsParY;
        const index = this.motSquelette.index;

        if ( index === 0 || compteurMotsParalleles[index - 1] === 0) {
            if (this.motSquelette.index === this.tailleGrille - 1 || compteurMotsParalleles[index + 1] === 0) {
                if (compteurMotsParalleles[index] < DEUX) {
                    return true;
                }
            }
        }

        return false;
    }

    private rajouterMotSquelette(): void {

        let nbMotsPourCetteLigne: number;
        this.motSquelette.verticalite ? nbMotsPourCetteLigne = this.compteurMotsParX[this.motSquelette.index]
            : nbMotsPourCetteLigne = this.compteurMotsParY[this.motSquelette.index];
        if (nbMotsPourCetteLigne === 0 ) {
            this.rajouterMotSqueletteSurLigneVide();
        } else if (nbMotsPourCetteLigne === 1) {
            this.rajouterMotSqueletteSurLigneAvecUnMot();
        } else {
            return; // en attendant ca doit faire une erreur 2 mots max
        }
    }

    private rajouterMotSqueletteSurLigneVide(): void {

        if (this.motSquelette.verticalite) {
            for (let i = 0; i < this.motSquelette.longueur; i++) {
                this.grille[i][this.motSquelette.index] = VIDE;
                this.compteurMotsParX[this.motSquelette.index]++;
            }
        } else {
            for (let i = 0; i < this.motSquelette.longueur; i++) {
                this.grille[this.motSquelette.index][i] = VIDE;
                this.compteurMotsParY[this.motSquelette.index]++;
            }
        }
    }

    private genererMotifInitial(): void {
        const PAS = 2;
        for (let i = 1; i < this.tailleGrille; i += PAS) {
            for (let j = 1; j < this.tailleGrille; j += PAS) {
                this.grille[i][j] = NOIR;
                this.compteurCasesNoires++;
            }
        }
    }

    private rajouterMotSqueletteSurLigneAvecUnMot(): void { // TODO:cette fonction a plein de bugs
        if (this.motSquelette.verticalite) {
            let i = 0;
            while (this.grille[i][this.motSquelette.index] === VIDE) {
                i++;
            }
            // Faire attention on peut depasser la grille
            i++;
            while (i < this.motSquelette.longueur) {
                this.grille[i][this.motSquelette.index] = VIDE;
                i++;
            }
            this.compteurMotsParX[this.motSquelette.index]++;
        } else {
            let i = 0;
            while (this.grille[this.motSquelette.index][i] === VIDE) {
                i++;
            }
            // Faire attention on peut depasser la grille
            while (i < this.motSquelette.longueur) {
                this.grille[this.motSquelette.index][i] = VIDE;
                i++;
            }
            this.compteurMotsParY[this.motSquelette.index]++;
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
