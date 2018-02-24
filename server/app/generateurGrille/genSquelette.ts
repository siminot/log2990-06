import { TAILLE_TABLEAU, NOIR } from "./constantes";

export class GenSquelette {

    private grille: Array<Array<string>>;

    constructor() {
        this.grille = new Array<Array<string>>();
        this.initGrille();
        // TEMPORAIRE POUR COMPILATION
        this.probabiliterDeContinuerMot(0);
    }

    private initGrille(): void {
        this.grille = new Array(TAILLE_TABLEAU).fill(NOIR);
        for (let i = 0; i < TAILLE_TABLEAU; i++) {
            this.grille[i] = new Array(TAILLE_TABLEAU).fill(NOIR);
        }
    }

    // TESTER QUAND ON VA AVOIR UNE BONNE HEURISTIQUE
    private probabiliterDeContinuerMot(i: number): number {
        return 0;
    }

}
