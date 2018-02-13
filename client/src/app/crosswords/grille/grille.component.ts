import { Component, OnInit} from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

import { Word, LettreGrille } from "../mockObject/word";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { DirectiveFocusDirective } from "../directive-focus/directive-focus.directive";

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
  public textvalue: string = "HELLO WORLD";

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
    return(etat ? "0" : "1");
  }

  private makeID(i: number, j: number): string {
    const a: string = String(i);
    const b: string = String(j);

    return a + b;
  }

  private remplirLettresSelect(): void {
    this.positionCourante = 0;
    this.positionLettresSelectionnees = [];

    let tmp: string = this.makeID(this.motSelectionne.premierX, this.motSelectionne.premierY);
    this.positionLettresSelectionnees[0] = tmp;

    for (let i: number = 1 ; i < this.motSelectionne.longeur ; i++) {
      if (this.motSelectionne.vertical) {
        tmp = this.makeID(this.motSelectionne.premierX, this.motSelectionne.premierY + i);
      } else {
        tmp = this.makeID(this.motSelectionne.premierX + i, this.motSelectionne.premierY);
      }
      this.positionLettresSelectionnees[i] = tmp;
    }
  }

  private focusOnRightLetter(): void {
    let elemTmp:HTMLInputElement;
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
    console.log(event.keyCode);
    if (event.key === "Backspace") {
      this.focusOnPreviousLetter();
    } else if (event.keyCode >= 65 && event.keyCode <= 90) {
      this.focusOnNextLetter();
    }
  }

  private focusOnNextLetter(): void {
    console.log("forward.");
    if (this.positionCourante < this.motSelectionne.longeur - 1) {
      this.positionCourante++;
      const elem: HTMLElement = document.getElementById(this.positionLettresSelectionnees[this.positionCourante]);
      elem.focus();
    }
  }

  private focusOnPreviousLetter(): void {
    const elemCourant: HTMLInputElement = <HTMLInputElement>document.getElementById(this.positionLettresSelectionnees[this.positionCourante]);
    if(this.positionCourante === this.motSelectionne.longeur - 1 && elemCourant.value != '') {
      elemCourant.value = '';
    } else if (this.positionCourante > 0) {
      this.positionCourante--;
      const elem: HTMLInputElement = <HTMLInputElement>document.getElementById(this.positionLettresSelectionnees[this.positionCourante]);
      elem.focus();
      elem.value = '';
    }
  }

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
    this.subscriptionMotSelec.unsubscribe();
  }

  // Fonction appelée dans la Directive.
  public prnt(): void {
    console.log("test");
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
