import { TAILLE_TABLEAU, TAILLE_MINIMUM, HEURISTIQUE_LNG_MOT, PROB_CASE_N, NOIR, CASE_OK, VIDE } from "./constantes";

export class GenSquelette {

    private grille: Array<Array<string>>;

    constructor() {
        this.grille = new Array<Array<string>>();
        this.initGrille();
    }

    public getSqueletteGrille(): Array<Array<string>> {
        this.initGrille();
        this.genererSquelette();

        return this.grille;
    }

    private genererSquelette(): void {
        for (let i: number = 0; i < TAILLE_TABLEAU; i += TAILLE_MINIMUM) {
            this.ecrireLigne(i);
            this.ecrireCol(i + 1);
        }
        this.nettoyerCases();
    }

    private nettoyerCases(): void {
        for (let i: number = 0; i < TAILLE_TABLEAU; i++) {
            for (let j: number = 0; j < TAILLE_TABLEAU; j++) {
                if (this.grille[i][j] === CASE_OK) {
                    this.grille[i][j] = NOIR;
                }
            }
        }
    }

    private initGrille(): void {
        this.grille = new Array(TAILLE_TABLEAU).fill(CASE_OK);
        for (let i: number = 0; i < TAILLE_TABLEAU; i++) {
            this.grille[i] = new Array(TAILLE_TABLEAU).fill(CASE_OK);
        }
    }

    private trouverIndexFinDeMot(indiceDep: number): number {
        if (this.indicePasDansGrille(indiceDep)) {
            return -1;
        }
        let indice: number = 0;

        while (this.probabiliterDeContinuerMot(indice, indiceDep)) {
            ++indice;
        }

        return indice + indiceDep;
    }

    private probabiliterDeContinuerMot(indice: number, indiceDep: number): boolean {
        if (this.indicePasDansGrille(indice + indiceDep)) {
            return false;
        } else if (indice <= TAILLE_MINIMUM) {
            return true;
        }

        const prob: number = 1 - indice / (HEURISTIQUE_LNG_MOT * (TAILLE_TABLEAU - indiceDep));

        return Math.random() < prob ? true : false;
    }

    private probaDeContinuerCaseNoire(): boolean {
        return Math.random() < PROB_CASE_N ? true : false;
    }

    private ecrireLigne(i: number): void {
        for (let j: number = 0; j < TAILLE_TABLEAU; j++) {
            if (this.grille[i][j] === CASE_OK) {
                if (this.probaDeContinuerCaseNoire()) {
                    this.grille[i][j] = NOIR;
                } else {
                    j = this.trouverIndexFinDeMot(j);
                    if (j < TAILLE_TABLEAU - 1) {
                        this.grille[i][++j] = NOIR;
                    }
                }
            }
        }
        for (let j: number = 0; j < TAILLE_TABLEAU; j++) {
            if (this.grille[i][j] === CASE_OK) {
                this.grille[i][j] = VIDE;
            }
        }

        return;
    }

    private ecrireCol(j: number): void {
        for (let i: number = 0; i < TAILLE_TABLEAU; i++) {
            if (this.grille[i][j] !== CASE_OK) {
                if (this.probaDeContinuerCaseNoire()) {
                    this.grille[i][j] = NOIR;
                } else {
                    i = this.trouverIndexFinDeMot(j);
                    if (i < TAILLE_TABLEAU - 1) {
                        this.grille[++i][j] = NOIR;
                    }
                }
            }
        }
        this.remplirEspaceMot(j);

        return;
    }

    private remplirEspaceMot(j: number): void {
        for (let i: number = 0; i < TAILLE_TABLEAU; i++) {
            if (this.grille[i][j] === CASE_OK) {
                this.grille[i][j] = VIDE;
            }
        }
    }

    private indicePasDansGrille(indice: number): boolean {
        if (indice < 0) {
            return true;
        } else if (indice >= TAILLE_TABLEAU - 1) {
            return true;
        }

        return false;
    }

}
