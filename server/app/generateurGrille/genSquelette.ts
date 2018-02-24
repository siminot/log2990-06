import { TAILLE_TABLEAU, NOIR, HEURISTIQUE_LNG_MOT } from "./constantes";

export class GenSquelette {

    private grille: Array<Array<string>>;

    constructor() {
        this.grille = new Array<Array<string>>();
        this.initGrille();
        // TEMPORAIRE POUR COMPILATION
        this.probabiliterDeContinuerMot(0, 0);
    }

    private initGrille(): void {
        this.grille = new Array(TAILLE_TABLEAU).fill(NOIR);
        for (let i = 0; i < TAILLE_TABLEAU; i++) {
            this.grille[i] = new Array(TAILLE_TABLEAU).fill(NOIR);
        }
    }

    // Retourne l'indice ou le mot se termine
    // private genererEspaceMot(indiceDep: number): number {

    //     let indice = 0;

    //     while (this.probabiliterDeContinuerMot(indice, indiceDep)) {
    //         indice++;
    //     }

    //     // for (let i = 0; i < (TAILLE_TABLEAU - indiceDep); i++) {
    //     //     if (this.probabiliterDeContinuerMot(i, indiceDep)) {

    //     //     }
    //     // }

    //     return 0;
    // }

    // TESTER QUAND ON VA AVOIR UNE BONNE HEURISTIQUE
    private probabiliterDeContinuerMot(indice: number, indiceDep: number): boolean {
        if (this.indicePasDansGrille(indice) || this.indicePasDansGrille(indiceDep)) {
            return false;
        }

        const prob = 1 - indice / (HEURISTIQUE_LNG_MOT * (TAILLE_TABLEAU - indiceDep));

        return Math.random() < prob ? true : false;
    }

    private indicePasDansGrille(indice: number): boolean {
        if (indice < 0) {
            return true;
        } else if (indice >= TAILLE_TABLEAU) {
            return true;
        }

        // Sinon dans grille
        return false;
    }

}
