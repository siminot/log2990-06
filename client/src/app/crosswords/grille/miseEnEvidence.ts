import * as CONST from "../constantes";
import { Mot } from "../objetsTest/mot";
import { EncadrementCase } from "./encadrementCase";

export class MiseEnEvidence {

    private motSelectionne: Mot;

    public miseEvidenceMot(mot: Mot, couleur: string): void {
        let uneCase: HTMLElement, idTmp: string, n: number;
        this.motSelectionne = mot;

        for (let i: number = 0; i < this.motSelectionne.longueur; i++) {
            idTmp = this.motSelectionne.positionsLettres[i];
            n = +idTmp[0] * CONST.DIZAINE + +idTmp[1];
            uneCase = document.getElementsByTagName("td")[n];
            this.miseEvidenceLettre(uneCase, i, couleur);
        }
    }

    private miseEvidenceLettre(uneCase: HTMLElement, position: number, couleur: string): void {
        if (!this.motSelectionne.estVertical) {
            this.miseEvidenceLettreNonVerticale(uneCase, position, couleur);
        } else {
            this.miseEvidenceLettreVericale(uneCase, position, couleur);
        }
    }

    private miseEvidenceLettreNonVerticale(uneCase: HTMLElement, position: number, couleur: string): void {
        if (position === 0) {
            EncadrementCase.appliquerBordureHaut(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
        } else if (position === this.motSelectionne.longueur - 1) {
            EncadrementCase.appliquerBordureBas(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
        }
        EncadrementCase.appliquerBordureGauche(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
        EncadrementCase.appliquerBordureDroite(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
    }

    private miseEvidenceLettreVericale(uneCase: HTMLElement, position: number, couleur: string): void {
        if (position === 0) {
            EncadrementCase.appliquerBordureGauche(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
        } else if (position === this.motSelectionne.longueur - 1) {
            EncadrementCase.appliquerBordureDroite(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
        }
        EncadrementCase.appliquerBordureHaut(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
        EncadrementCase.appliquerBordureBas(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
    }

}
