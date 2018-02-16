import { Component, OnInit} from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

import { Word, LettreGrille } from "../mockObject/word";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
// import { DirectiveFocusDirective } from "../directive-focus/directive-focus.directive";

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

  private subscriptionMots: Subscription;
  private subscriptionMatrice: Subscription;
  private subscriptionMotSelec: Subscription;

  public constructor(private listeMotsService: RequeteDeGrilleService) { }

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

        this.remplirLettresSelect();

        this.focusOnRightLetter();
      });
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

  private remplirLettresSelect(): void {
    this.positionCourante = 0;
    this.positionLettresSelectionnees = [];

    let tmp: string = this.makeID(this.motSelectionne.premierX, this.motSelectionne.premierY, "");
    this.positionLettresSelectionnees[0] = tmp;

    for (let i: number = 1 ; i < this.motSelectionne.longeur ; i++) {
      if (this.motSelectionne.vertical) {
        tmp = this.makeID(this.motSelectionne.premierX, this.motSelectionne.premierY + i, "");
      } else {
        tmp = this.makeID(this.motSelectionne.premierX + i, this.motSelectionne.premierY, "");
      }
      this.positionLettresSelectionnees[i] = tmp;
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

  private manageKeyEntry(event: any): void {
    if (event.key === "Backspace") {
      this.focusOnPreviousLetter();
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      this.focusOnNextLetter();
    }
  }

  private focusOnNextLetter(): void {
    // Vérifier s'il y a déjà une lettre sur la case. Passer à la prochaine case si c'est le cas.
    if (this.positionCourante < this.motSelectionne.longeur - 1) {
      this.positionCourante++;
      const elem: HTMLElement = document.getElementById(this.positionLettresSelectionnees[this.positionCourante]);
      elem.focus();
    } else if (this.positionCourante === this.motSelectionne.longeur - 1) {   // TODO : Vérifier si la condition est réellement nécessaire.
      this.validateWord();
    }
  }

  private validateWord(): void {
    let usersWord: string = this.createWordFromSelectedLetters();
    console.log("created word from the letters in the input : ", usersWord);
    
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
    
    if(this.onLastLetterOfWord(elemCourant) && elemCourant.value != '') {
      elemCourant.value = '';
    } else if (this.positionCourante > 0) {
      this.positionCourante--;
      const previousElem: HTMLInputElement = <HTMLInputElement>document.getElementById(this.positionLettresSelectionnees[this.positionCourante]);
      previousElem.focus();
      previousElem.value = '';
    }
  }

  private onLastLetterOfWord(elemCourant: HTMLInputElement): boolean {
    return this.positionCourante === this.motSelectionne.longeur - 1 ? true : false;
  }

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
    this.subscriptionMotSelec.unsubscribe();
  }

  public printID($event: any): void {
    const target: any = event.target || event.srcElement || event.currentTarget;
    const idAttr: any = target.attributes.id;
    const value: any = idAttr.nodeValue;
    console.log(value);
  }

  private retrieveWordFromClick(event: any): void {

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


}


  /*
  ** Pour une autre carte que celle du sprint 1. **
  public onKey(event: any): void {
    const element: any = event.srcElement.nextElementSibling;

    if (element != null) {
      const elem: HTMLElement = document.getElementById("testFocus");
      elem.focus();
    }
  }
  */
