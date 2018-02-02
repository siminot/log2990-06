import { Component, OnInit } from "@angular/core";
import { Mockword, objetTest } from "../mockObject/mockWord";
import { TAILLE_TABLEAU } from "../constantes";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";

@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

export class GrilleComponent implements OnInit {
  private mots: Mockword[];
  private motsAAfficher: String[];
  private matriceVide: Array<Array<objetTest>>;
  private dessu: boolean;
  private compteur: number;

  public constructor(private listeMotsService: RequeteDeGrilleService) {
    this.matriceVide = this.genererGrille();
    this.compteur = 0;
    this.dessu = false;
  }

  ngOnInit() {
    this.getMots();
    this.putWordsInGrid();
  }

  private genererGrille(): Array<Array<objetTest>> {
    let matrice: Array<Array<objetTest>> = new Array(TAILLE_TABLEAU);

    for (let i: number = 0; i < TAILLE_TABLEAU; i++){
      let row: Array<objetTest> = new Array(TAILLE_TABLEAU);
      for (let j: number = 0; j < TAILLE_TABLEAU; j++){
        let caseNoir: objetTest;

        if(j%2==0)
          caseNoir = {case:true, mot:"X"};
        else
          caseNoir = {case:true, mot:"P"};
        
        row[j] = caseNoir;
      }
      matrice[i] = row;
    }
  
    return matrice;
  }

  myStyle(etat:boolean): string{
    if(!etat)
      return("0")
    return("1")
  }


  getMots(): void {
    this.listeMotsService.getMots().subscribe(mots => this.mots = mots);
  }

  putWordsInGrid(): void {
    for(let mot of this.mots) {
      console.log(mot.mots);
    }
  }
}
