import * as CONST from "../constantes";

export class EncadrementCase {

    public static appliquerStyleDefautGrille(unDoc: Document): void {
        let uneCase: HTMLElement;
        for (let n: number = 0; n < CONST.TAILLE_TABLEAU * CONST.TAILLE_TABLEAU; n++) {
            uneCase = unDoc.getElementsByTagName("td")[n];
            this.appliquerBordureHaut(uneCase, CONST.COULEUR_BORDURE_CASE_DEFAUT, CONST.LARGEUR_BORDURE_CASE_DEFAUT);
            this.appliquerBordureBas(uneCase, CONST.COULEUR_BORDURE_CASE_DEFAUT, CONST.LARGEUR_BORDURE_CASE_DEFAUT);
            this.appliquerBordureGauche(uneCase, CONST.COULEUR_BORDURE_CASE_DEFAUT, CONST.LARGEUR_BORDURE_CASE_DEFAUT);
            this.appliquerBordureDroite(uneCase, CONST.COULEUR_BORDURE_CASE_DEFAUT, CONST.LARGEUR_BORDURE_CASE_DEFAUT);
        }
    }

    public static appliquerBordureHaut(uneCase: HTMLElement, couleur: string, largeur: string): void {
        if (uneCase !== undefined) {
            uneCase.style.borderTopColor = couleur;
            uneCase.style.borderTopWidth = largeur;
        }
    }

    public static appliquerBordureBas(uneCase: HTMLElement, couleur: string, largeur: string): void {
        if (uneCase !== undefined) {
            uneCase.style.borderBottomColor = couleur;
            uneCase.style.borderBottomWidth = largeur;
        }
    }

    public static appliquerBordureGauche(uneCase: HTMLElement, couleur: string, largeur: string): void {
        if (uneCase !== undefined) {
            uneCase.style.borderLeftColor = couleur;
            uneCase.style.borderLeftWidth = largeur;
        }
    }

    public static appliquerBordureDroite(uneCase: HTMLElement, couleur: string, largeur: string): void {
        if (uneCase !== undefined) {
            uneCase.style.borderRightColor = couleur;
            uneCase.style.borderRightWidth = largeur;
        }
    }

}
