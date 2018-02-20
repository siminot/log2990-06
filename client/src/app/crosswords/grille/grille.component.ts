import { Component, OnInit} from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

import { Word, LettreGrille } from "../mockObject/word";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { TAILLE_TABLEAU } from "../constantes";

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
    for (let i: number = 0 ; i < TAILLE_TABLEAU ; i++) {
      this.lockedLetter[i] = [];
      for (let j: number = 0 ; j < TAILLE_TABLEAU ; j++) {
        this.lockedLetter[i][j] = false;
      }
    }
  }

  public ngOnInit(): void {
    this.mots = this.listeMotsService.getMots();
    this.matriceDesMotsSurGrille = this.listeMotsService.getMatrice();

    this.subscriptionMots = this.listeMotsService.serviceReceptionMots()
      .subscribe((mots) => this.mots = mots);

    this.subscriptionMatrice = this.listeMotsService.serviceReceptionMatriceLettres()
      .subscribe((matrice) => this.matriceDesMotsSurGrille = matrice);

    this.subscriptionMotSelec = this.listeMotsService.serviceReceptionMotSelectionne()
      .subscribe((motSelec) => {
      this.motSelectionne = motSelec;
      this.motSelectionne.mot = this.motSelectionne.mot.toUpperCase();

      this.putDefaultStyleGrid();

      if (!this.motSelectionne.motTrouve) {
        this.remplirLettresSelect();
        this.miseEnEvidenceMot("red");
        this.focusOnRightLetter();
      }
    });
  }

  private putDefaultStyleGrid(): void {
    let uneCase: HTMLElement;
    for (let n: number = 0 ; n < TAILLE_TABLEAU * TAILLE_TABLEAU ; n++) {
      uneCase = document.getElementsByTagName("td")[n];
      uneCase.style.borderBottomColor = "black";
      uneCase.style.borderTopColor = "black";
      uneCase.style.borderLeftColor = "black";
      uneCase.style.borderRightColor = "black";
    }
  }

  private remplirLettresSelect(): void {
    this.positionCourante = 0;
    this.positionLettresSelectionnees = [];

    let tmp: string = this.makeID(this.motSelectionne.premierX, this.motSelectionne.premierY, "");
    this.positionLettresSelectionnees[0] = tmp;

    // const x: number = this.motSelectionne.premierX;
    // const y: number = this.motSelectionne.premierY;

    for (let i: number = 1 ; i < this.motSelectionne.longeur ; i++) {

      this.motSelectionne.vertical ? tmp = this.makeID(this.motSelectionne.premierX, this.motSelectionne.premierY + i, "") :
                                     tmp = this.makeID(this.motSelectionne.premierX + i, this.motSelectionne.premierY, "");

      this.positionLettresSelectionnees[i] = tmp;
    }
  }

  private miseEnEvidenceMot(couleur: string): void {
    let uneCase: HTMLElement;
    let idTmp: string;
    let n: number;
    for (let i: number = 0 ; i < this.motSelectionne.longeur ; i++) {
      idTmp = this.positionLettresSelectionnees[i];
      n = +idTmp[0] * 10 + +idTmp[1];
      uneCase = document.getElementsByTagName("td")[n];

      if (!this.motSelectionne.vertical) {   // Wrong side. Horizontal et vertical inversé.
        if (i === 0) {                                         // Premiere case.
          uneCase.style.borderTopColor = couleur;
        } else if (i === this.motSelectionne.longeur - 1) {   // Derniere case.
          uneCase.style.borderBottomColor = couleur;
        }                                                     // Toutes les cases.
        uneCase.style.borderRightColor = couleur;
        uneCase.style.borderLeftColor = couleur;
      } else {
        if (i === 0) {                                        // Premiere case.
          uneCase.style.borderLeftColor = couleur;
        } else if (i === this.motSelectionne.longeur - 1) {   // Derniere case.
          uneCase.style.borderRightColor = couleur;
        }                                                     // Toutes les cases du mot.
        uneCase.style.borderTopColor = couleur;
        uneCase.style.borderBottomColor = couleur;
      }
    }
  }
  
  private focusOnRightLetter(): void {
    let elemTmp: HTMLInputElement;
    let idTmp: string;
    
    for (let i: number = 0 ; i < this.motSelectionne.longeur ; i++) {
      idTmp = this.positionLettresSelectionnees[i];
      elemTmp = <HTMLInputElement>document.getElementById(idTmp);

      if(elemTmp.value === '') {
        this.positionCourante = i;
        elemTmp.focus();
        return;
      }
    }

    this.positionCourante = this.motSelectionne.longeur - 1;
    elemTmp.focus();
  }

  public manageKeyEntry(event: any): void {
    if (event.key === "Backspace") {
      this.focusOnPreviousLetter();
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      this.focusOnNextLetter();
    }
  }

  private focusOnNextLetter(): void {
    if (this.positionCourante < this.motSelectionne.longeur - 1) {
      this.positionCourante++;
      let elem: HTMLInputElement = <HTMLInputElement>document.getElementById(this.positionLettresSelectionnees[this.positionCourante]);
      elem.focus();

      if(elem.value != '') {
        this.focusOnNextLetter();
      }
    } else if (this.positionCourante === this.motSelectionne.longeur - 1) {   // TODO : Vérifier si la condition est réellement nécessaire.
      this.validateWord();
    }
  }

  private validateWord(): boolean {
    let usersWord: string = this.createWordFromSelectedLetters().toUpperCase();
    const valid: boolean = usersWord === this.motSelectionne.mot;

    if (valid) {
      this.motSelectionne.motTrouve = true;
      this.lockLettersFromWord(this.motSelectionne);
      this.miseEnEvidenceMot("green");
    }

    return valid;
  }

  private lockLettersFromWord(word: Word) {
    for(let i: number = 0 ; i < word.longeur ; i++) {
      if(word.vertical) {
        this.lockedLetter[word.premierX][word.premierY + i] = true;
      } else {
        this.lockedLetter[word.premierX + i][word.premierY] = true;
      }
    }
  }

  private createWordFromSelectedLetters(): string {
    let wordCreated: string = "";
    for(let i: number = 0 ; i < this.positionLettresSelectionnees.length ; i++) {
      wordCreated += (<HTMLInputElement>document.getElementById(this.positionLettresSelectionnees[i])).value;
    }
    
    return wordCreated;
  }

  private focusOnPreviousLetter(): void {
    let elemCourant: HTMLInputElement = <HTMLInputElement>document.getElementById(this.positionLettresSelectionnees[this.positionCourante]);
    const xCour: number = +this.positionLettresSelectionnees[this.positionCourante][0];
    const yCour: number = +this.positionLettresSelectionnees[this.positionCourante][1];

    if(!this.lockedLetter[xCour][yCour]) {
      if(this.isLastLetterOfWord(elemCourant) && elemCourant.value != '') {
        elemCourant.value = '';
      } else if (this.positionCourante > 0) {
        this.positionCourante--;

        const previousElem: HTMLInputElement = <HTMLInputElement>document.getElementById(this.positionLettresSelectionnees[this.positionCourante]);
        const xPrev: number = +this.positionLettresSelectionnees[this.positionCourante][0];
        const yPrev: number = +this.positionLettresSelectionnees[this.positionCourante][1];

        if(!this.lockedLetter[xPrev][yPrev]) {
          previousElem.focus();
          previousElem.value = '';
        }
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

  public printID($event: any): void {
    const target: any = event.target || event.srcElement || event.currentTarget;
    const idAttr: any = target.attributes.id;
    const value: any = idAttr.nodeValue;
    console.log(value);
  }

  public retrieveWordFromClick(event: any): void {

    // retrieve Id from the event
    const target: any = event.target || event.srcElement || event.currentTarget;
    const idAttr: any = target.attributes.id;
    const id: any = idAttr.nodeValue;
    const cordinate: string[] = id.split("");
    // coordonne X et Y de la case selectionne
    const x: number = +cordinate[0];
    const y: number = +cordinate[1];
    const motSousJacent: Word = this.findWordFromXY(x,y);
    this.motSelectionne = motSousJacent;

    this.envoieMotSelectionne(); 
    //this.remplirLettresSelect();
    this.focusOnRightLetter();

  }

  private findWordFromXY( X:number, Y:number): Word {
    let motTrouve: Word;
    for(const mot of  this.mots) {
      let other: number;
      let max: number;

      if ( !mot.vertical) {
        other = mot.premierY;
        max = mot.premierX + mot.longeur - 1;
        if( X <= max && Y === other) {
          console.log(mot.mot);
          motTrouve = mot;
          break;
        }
      }
      else if ( mot.vertical) {
        other = mot.premierX;
        max = mot.premierY + mot.longeur - 1;
        if ( Y <= max && X === other) {
          console.log(mot.mot);
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
