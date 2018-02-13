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

        const idSelectionne: string = String(this.motSelectionne.premierX) + String(this.motSelectionne.premierY);
        const elem: HTMLElement = document.getElementById(idSelectionne);
        
        elem.focus();
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

  public makeIDs(i: number, j: number): String {
    const a: string = String(i);
    const b: string = String(j);
    // const c: string = "c";

    return a + b;
  }

  public focusOn(): void {
    const elem: HTMLElement = this.getElementID();
    console.log(elem);
    elem.focus();
    console.log(this.motSelectionne);
  }

  public getElementID(): HTMLElement {
   return document.getElementById("01");
  }

  public printID($event: any): void {
    const target: any = event.target || event.srcElement || event.currentTarget;
    const idAttr: any = target.attributes.id;
    const value: any = idAttr.nodeValue;
    console.log(value);
  }

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
    this.subscriptionMotSelec.unsubscribe();
  }

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
