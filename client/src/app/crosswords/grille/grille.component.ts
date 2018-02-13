import { Component, OnInit} from "@angular/core";
import { Word, LettreGrille } from "../mockObject/word";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";

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

        const idSelectionne: string = this.makeID(this.motSelectionne.premierX, this.motSelectionne.premierY);
        const elem: HTMLElement = document.getElementById(idSelectionne);

        elem.focus();

        this.remplirLettresSelect();
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

  private focusOnNextLetter(): void {
    if (this.positionCourante < this.motSelectionne.longeur - 1) {
      this.positionCourante++;
      const elem: HTMLElement = document.getElementById(this.positionLettresSelectionnees[this.positionCourante]);
      elem.focus();
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
