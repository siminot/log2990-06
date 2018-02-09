import { Component, OnInit, Input, ElementRef, ViewChild, Renderer2 } from "@angular/core";
import { Word, LettreGrille } from "../mockObject/word";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";

import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { setTimeout } from "timers";

@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

export class GrilleComponent implements OnInit, OnDestroy {
  //@ViewChild("macro", {read: ElementRef})
  //private e: ElementRef;

  private mots: Word[];
  private matriceDesMotsSurGrille: Array<Array<LettreGrille>>;
  private motSelectionne: Word;
  private lettreSelectionne: LettreGrille;

  private subscriptionMots: Subscription;
  private subscriptionMatrice: Subscription;
  private subscriptionMotSelec: Subscription;

  /*@Input("this.motSelectionne")
  public set focusOnMotSelectionne(this.motSelectionne: LettreGrille): void {
    const elem: HTMLElement = document.getElementById("00");
    console.log(elem);
    elem.focus();
  }*/

  public constructor(private listeMotsService: RequeteDeGrilleService, private el: ElementRef, private renderer: Renderer2) { }

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
        console.log(this.el.nativeElement);
        this.renderer.addClass(this.el.nativeElement, "faefaef");
        let element = this.renderer.selectRootElement("#c00");
        console.log(element);
        console.log(element.nativeElement.querySelector("#c00"));
        console.log(element.nativeElement.getElementById(".c00"));
        console.log(this.el.nativeElement.querySelector(".c00"));
        let hElem: HTMLElement = this.el.nativeElement;
        console.log(hElem.getElementById("c00"));
        const elem: HTMLElement = this.el.nativeElement.getElementById("c00");
        console.log(elem);
        //const elem: HTMLElement = document.getElementById("00");
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
    const c: string = "c";

    return c + a + b;
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
  }

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
    this.subscriptionMotSelec.unsubscribe();
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
