import { TAILLE_TABLEAU, NOIR, HEURISTIQUE_LNG_MOT } from "./constantes";

export class GenSquelette {

    private grille: Array<Array<string>>;

    constructor() {
        this.grille = new Array<Array<string>>();
        this.initGrille();
        // Pour Compil serveur
        this.trouverIndexFinDeMot(0);
    }

    private initGrille(): void {
        this.grille = new Array(TAILLE_TABLEAU).fill(NOIR);
        for (let i = 0; i < TAILLE_TABLEAU; i++) {
            this.grille[i] = new Array(TAILLE_TABLEAU).fill(NOIR);
        }
    }

    // Retourne l'indice ou le mot se termine
    private trouverIndexFinDeMot(indiceDep: number): number {
        if (this.indicePasDansGrille(indiceDep)) {
            return -1;
        }
        let indice = 0;

        while (this.probabiliterDeContinuerMot(indice, indiceDep)) {
            indice++;
        }

        return indice + indiceDep;
    }

    // TESTER QUAND ON VA AVOIR UNE BONNE HEURISTIQUE
    private probabiliterDeContinuerMot(indice: number, indiceDep: number): boolean {
        if (this.indicePasDansGrille(indice + indiceDep)) {
            return false;
        } else if (indice <= 2) {
            return true;
        }

        const prob = 1 - indice / (HEURISTIQUE_LNG_MOT * (TAILLE_TABLEAU - indiceDep));

        return Math.random() < prob ? true : false;
    }

    private indicePasDansGrille(indice: number): boolean {
        if (indice < 0) {
            return true;
        } else if (indice >= TAILLE_TABLEAU - 1) {
            return true;
        }

        // Sinon dans grille
        return false;
    }

}
