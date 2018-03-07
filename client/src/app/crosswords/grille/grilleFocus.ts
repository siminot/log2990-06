import { Mot } from "../objetsTest/mot";

export class GrilleFocus {

  public constructor(private document: Document,
                     private positionCourante: number) { }

  public focusSurBonneLettre(motSelectionne: Mot): void {
    let elemTmp: HTMLInputElement, idTmp: string;
    let i: number;

    for (i = 0; i < motSelectionne.longueur; i++) {
      idTmp = motSelectionne.positionsLettres[i];
      elemTmp = this.document.getElementById(idTmp) as HTMLInputElement;

      if (elemTmp.value === "") {
        this.positionCourante = i;
        elemTmp.focus();

        return;
      }
    }

    this.positionCourante = motSelectionne.longueur - 1;
    elemTmp.focus();
  }

  public focusOnNextLetter(motSelectionne: Mot): boolean {
    if (this.positionCourante < motSelectionne.longueur - 1) {
      this.positionCourante++;
      const elem: HTMLInputElement =
        this.document.getElementById(motSelectionne.positionsLettres[this.positionCourante]) as HTMLInputElement;
      if (elem !== null) {
        elem.focus();

        if (elem.value !== "") {
          return this.focusOnNextLetter(motSelectionne);
        }
      }

    } else if (this.positionCourante === motSelectionne.longueur - 1) {
      return true;
    }

    return false;
  }

  public removeFocusFromSelectedWord(motSelectionne: Mot): void {
    const elem: HTMLInputElement = this.document.getElementById(motSelectionne.positionsLettres[this.positionCourante]) as HTMLInputElement;
    elem.blur();
  }

  public focusOnPreviousLetter(motSelectionne: Mot, lockedLetter: boolean[][]): void {
    const idCourant: string = motSelectionne.positionsLettres[this.positionCourante];
    const elemCourant: HTMLInputElement = this.document.getElementById(idCourant) as HTMLInputElement;
    const xCour: number = +motSelectionne.positionsLettres[this.positionCourante][0];
    const yCour: number = +motSelectionne.positionsLettres[this.positionCourante][1];

    if (this.isLastLetterOfWord(motSelectionne) && !lockedLetter[xCour][yCour] && elemCourant.value !== "") {
      elemCourant.value = "";
    } else if (this.positionCourante > 0 || (this.isLastLetterOfWord(motSelectionne) && lockedLetter[xCour][yCour])) {
      this.positionCourante--;
      const idPrev: string = motSelectionne.positionsLettres[this.positionCourante];
      const previousElem: HTMLInputElement = this.document.getElementById(idPrev) as HTMLInputElement;
      const xPrev: number = +motSelectionne.positionsLettres[this.positionCourante][0];
      const yPrev: number = +motSelectionne.positionsLettres[this.positionCourante][1];

      if (previousElem !== null) {
        if (!lockedLetter[xPrev][yPrev]) {
          previousElem.focus();
          previousElem.value = "";
        } else {
          this.focusOnPreviousLetter(motSelectionne, lockedLetter);
        }
      }
    }
  }

  private isLastLetterOfWord(motSelectionne: Mot): boolean {
    return this.positionCourante === motSelectionne.longueur - 1 ? true : false;
  }
}
