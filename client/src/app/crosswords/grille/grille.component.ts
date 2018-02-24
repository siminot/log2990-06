import { Component, OnInit} from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

import { Word, LettreGrille } from "../mockObject/word";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import * as CONST from "../constantes";

@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

export class GrilleComponent implements OnInit, OnDestroy {
  private mots: Word[];
  private matriceDesMotsSurGrille: Array<Array<LettreGrille>>;
  private motSelectionne: Word;
  private positionLettresSelectionnees: string[];
  private positionCourante: number;
  private lockedLetter: boolean[][];

  private subscriptionMots: Subscription;
  private subscriptionMatrice: Subscription;
  private subscriptionMotSelec: Subscription;

  public constructor(private listeMotsService: RequeteDeGrilleService) {
    this.lockedLetter = [];
    for (let i: number = 0 ; i < CONST.TAILLE_TABLEAU ; i++) {
      this.lockedLetter[i] = [];
      for (let j: number = 0 ; j < CONST.TAILLE_TABLEAU ; j++) {
        this.lockedLetter[i][j] = false;
      }
    }
  }

  public ngOnInit(): void {
    this.mots = this.listeMotsService.getMots();

    this.matriceDesMotsSurGrille = this.listeMotsService.getMatrice();

    this.subscriptionMots = this.listeMotsService.serviceReceptionMots().subscribe((mots) => { this.mots = mots; console.log(this.mots);});

    this.subscriptionMatrice = this.listeMotsService.serviceReceptionMatriceLettres()
      .subscribe((matrice) => this.matriceDesMotsSurGrille = matrice);

    this.subscriptionMotSelec = this.listeMotsService.serviceReceptionMotSelectionne()
      .subscribe((motSelec) => {
        this.motSelectionne = motSelec;
        this.motSelectionne.mot = this.motSelectionne.mot.toUpperCase();
        this.putDefaultStyleGrid();

        if (!this.motSelectionne.motTrouve) {
          this.remplirLettresSelect();
          this.highlightWord();
          this.focusOnRightLetter();
        }
    });
  }

  private putDefaultStyleGrid(): void {
    let uneCase: HTMLElement;
    for (let n: number = 0 ; n < CONST.TAILLE_TABLEAU * CONST.TAILLE_TABLEAU ; n++) {
      uneCase = document.getElementsByTagName("td")[n];
      this.applyTopBorderToBox(uneCase, CONST.DEFAULT_BOX_BORDER_COLOR, CONST.DEFAULT_BOX_BORDER_WIDTH);
      this.applyBottomBorderToBox(uneCase, CONST.DEFAULT_BOX_BORDER_COLOR, CONST.DEFAULT_BOX_BORDER_WIDTH);
      this.applyLeftBorderToBox(uneCase, CONST.DEFAULT_BOX_BORDER_COLOR, CONST.DEFAULT_BOX_BORDER_WIDTH);
      this.applyRightBorderToBox(uneCase, CONST.DEFAULT_BOX_BORDER_COLOR, CONST.DEFAULT_BOX_BORDER_WIDTH);
    }
  }

  private applyTopBorderToBox(box: HTMLElement, color: string, width: string): void {
    box.style.borderTopColor = color;
    box.style.borderTopWidth = width;
  }

  private applyBottomBorderToBox(box: HTMLElement, color: string, width: string): void {
    box.style.borderBottomColor = color;
    box.style.borderBottomWidth = width;
  }

  private applyLeftBorderToBox(box: HTMLElement, color: string, width: string): void {
    box.style.borderLeftColor = color;
    box.style.borderLeftWidth = width;
  }

  private applyRightBorderToBox(box: HTMLElement, color: string, width: string): void {
    box.style.borderRightColor = color;
    box.style.borderRightWidth = width;
  }

  private remplirLettresSelect(): void {
    this.positionCourante = 0;
    this.positionLettresSelectionnees = [];

    let tmp: string = this.makeID(this.motSelectionne.premierX, this.motSelectionne.premierY, "");
    this.positionLettresSelectionnees[0] = tmp;

    const x: number = this.motSelectionne.premierX;
    const y: number = this.motSelectionne.premierY;

    for (let i: number = 1 ; i < this.motSelectionne.longeur ; i++) {
      this.motSelectionne.estVertical ? tmp = this.makeID(x, y + i, "") : tmp = this.makeID(x + i, y, "");
      this.positionLettresSelectionnees[i] = tmp;
    }
  }

  private highlightWord(): void {
    let uneCase: HTMLElement, idTmp: string, n: number;

    for (let i: number = 0 ; i < this.motSelectionne.longeur ; i++) {
      idTmp = this.positionLettresSelectionnees[i];
      n = +idTmp[0] * CONST.DIZAINE + +idTmp[1];
      uneCase = document.getElementsByTagName("td")[n];
      this.highlightLetter(uneCase, i);
    }
  }

  private highlightLetter(box: HTMLElement, position: number): void {
    if (!this.motSelectionne.estVertical) {
      this.highlightNonVerticalLetter(box, position);
    } else {
      this.highlightVerticalLetter(box, position);
    }
  }

  private highlightNonVerticalLetter(box: HTMLElement, position: number): void {
    if (position === 0) {
      this.applyTopBorderToBox(box, CONST.TARGET_BOX_BORDER_COLOR, CONST.TARGET_BOX_BORDER_WIDTH);
    } else if (position === this.motSelectionne.longeur - 1) {
      this.applyBottomBorderToBox(box, CONST.TARGET_BOX_BORDER_COLOR, CONST.TARGET_BOX_BORDER_WIDTH);
    }
    this.applyLeftBorderToBox(box, CONST.TARGET_BOX_BORDER_COLOR, CONST.TARGET_BOX_BORDER_WIDTH);
    this.applyRightBorderToBox(box, CONST.TARGET_BOX_BORDER_COLOR, CONST.TARGET_BOX_BORDER_WIDTH);
  }

  private highlightVerticalLetter(box: HTMLElement, position: number): void {
    if (position === 0) {
      this.applyLeftBorderToBox(box, CONST.TARGET_BOX_BORDER_COLOR, CONST.TARGET_BOX_BORDER_WIDTH);
    } else if (position === this.motSelectionne.longeur - 1) {
      this.applyRightBorderToBox(box, CONST.TARGET_BOX_BORDER_COLOR, CONST.TARGET_BOX_BORDER_WIDTH);
    }
    this.applyTopBorderToBox(box, CONST.TARGET_BOX_BORDER_COLOR, CONST.TARGET_BOX_BORDER_WIDTH);
    this.applyBottomBorderToBox(box, CONST.TARGET_BOX_BORDER_COLOR, CONST.TARGET_BOX_BORDER_WIDTH);
  }

  private focusOnRightLetter(): void {
    let elemTmp: HTMLInputElement, idTmp: string;
    let i: number;

    for (i = 0 ; i < this.motSelectionne.longeur ; i++) {
      idTmp = this.positionLettresSelectionnees[i];
      elemTmp = document.getElementById(idTmp) as HTMLInputElement;

      if (elemTmp.value === "") {
        this.positionCourante = i;
        elemTmp.focus();

        return;
      }
    }

    this.positionCourante = this.motSelectionne.longeur - 1;
    elemTmp.focus();
  }

  public manageKeyEntry(event: KeyboardEvent): void {
    if (event.key === "Backspace") {
      this.focusOnPreviousLetter();
    } else if (event.keyCode >= CONST.KEYCODE_MIN && event.keyCode <= CONST.KEYCODE_MAX) {
      this.focusOnNextLetter();
    }
  }

  private focusOnNextLetter(): void {
    if (this.positionCourante < this.motSelectionne.longeur - 1) {
      this.positionCourante++;
      const elem: HTMLInputElement = document.getElementById(this.positionLettresSelectionnees[this.positionCourante]) as HTMLInputElement;
      elem.focus();

      if (elem.value !== "") {
        this.focusOnNextLetter();
      }
    } else if (this.positionCourante === this.motSelectionne.longeur - 1) {
      this.validateWord();
    }
  }

  private validateWord(): boolean {
    const usersWord: string = this.createWordFromSelectedLetters().toUpperCase();
    const valid: boolean = usersWord === this.motSelectionne.mot;

    if (valid) {
      this.motSelectionne.motTrouve = true;
      this.lockLettersFromWord();
      this.miseEnEvidenceMot("green");
      this.removeFocusFromSelectedWord();
    }

    return valid;
  }

  private removeFocusFromSelectedWord(): void {
    const elem: HTMLInputElement = document.getElementById(this.positionLettresSelectionnees[this.positionCourante]) as HTMLInputElement;
    elem.blur();
  }

  private lockLettersFromWord(): void {
    for (let i: number = 0 ; i < this.motSelectionne.longeur ; i++) {
      if (this.motSelectionne.estVertical) {
        this.lockedLetter[this.motSelectionne.premierX][this.motSelectionne.premierY + i] = true;
      } else {
        this.lockedLetter[this.motSelectionne.premierX + i][this.motSelectionne.premierY] = true;
      }
    }
  }

  private createWordFromSelectedLetters(): string {
    let wordCreated: string = "";

    for (const elem of this.positionLettresSelectionnees) {
      wordCreated += (document.getElementById(elem) as HTMLInputElement).value;
    }

    return wordCreated;
  }

  private focusOnPreviousLetter(): void {
    const idCourant: string = this.positionLettresSelectionnees[this.positionCourante];
    const elemCourant: HTMLInputElement = document.getElementById(idCourant) as HTMLInputElement;
    const xCour: number = +this.positionLettresSelectionnees[this.positionCourante][0];
    const yCour: number = +this.positionLettresSelectionnees[this.positionCourante][1];

    if (this.isLastLetterOfWord(elemCourant) && !this.lockedLetter[xCour][yCour] && elemCourant.value !== "") {
      elemCourant.value = "";
    } else if (this.positionCourante > 0 || (this.isLastLetterOfWord(elemCourant) && this.lockedLetter[xCour][yCour])) {
      this.positionCourante--;
      const idPrev: string = this.positionLettresSelectionnees[this.positionCourante];
      const previousElem: HTMLInputElement = document.getElementById(idPrev) as HTMLInputElement;
      const xPrev: number = +this.positionLettresSelectionnees[this.positionCourante][0];
      const yPrev: number = +this.positionLettresSelectionnees[this.positionCourante][1];

      if (!this.lockedLetter[xPrev][yPrev]) {
        previousElem.focus();
        previousElem.value = "";
      } else {
        this.focusOnPreviousLetter();
      }
    }
  }

  private isLastLetterOfWord(elemCourant: HTMLInputElement): boolean {
    return this.positionCourante === this.motSelectionne.longeur - 1 ? true : false;
  }

  public getListeMots(): Word[] {
    return this.mots;
  }

  public getMatrice(): Array<Array<LettreGrille>> {
    return this.matriceDesMotsSurGrille;
  }

  public opacite(etat: boolean): String {
    return(etat ? "0" : ".3");
  }

  private makeID(i: number, j: number, k: string): string {
    const a: string = String(i);
    const b: string = String(j);

    return a + b + k;
  }

  public retrieveWordFromClick(event: KeyboardEvent): void {
    // retrieve Id from the event
    // Erreur de typescript en précisant le type
    // tslint:disable-next-line:no-any
    const target: any = event.target || event.srcElement || event.currentTarget;
    const cordinate: string[] = target.attributes.id.nodeValue.split("");
    // coordonne X et Y de la case selectionne
    const x: number = +cordinate[0];
    const y: number = +cordinate[1];
    const motSousJacent: Word = this.findWordFromXY(x, y);
    this.motSelectionne = motSousJacent;

    this.envoieMotSelectionne();
    // this.focusOnRightLetter();
  }

  private findWordFromXY( X: number, Y: number): Word {
    let motTrouve: Word;
    for (const mot of  this.mots) {
      let other: number;
      let max: number;

      if (!mot.estVertical) {
        other = mot.premierY;
        max = mot.premierX + mot.longeur - 1;
        if ( X <= max && Y === other) {
          motTrouve = mot;
          break;
        }
      } else if ( mot.estVertical) {
        other = mot.premierX;
        max = mot.premierY + mot.longeur - 1;
        if ( Y <= max && X === other) {
          motTrouve = mot;
          break;
        }
      }
    }

    return motTrouve;
  }

  public envoieMotSelectionne(): void {
    this.listeMotsService.serviceEnvoieMotSelectionne(this.motSelectionne);
  }

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
    this.subscriptionMotSelec.unsubscribe();
  }
}
