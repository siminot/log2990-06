import { Component, OnInit } from "@angular/core";

import { TAILLE_TABLEAU } from "../constantes";
import { objetTest } from "../mockObject/mockWord";
import { Mockword } from '../mockObject/mockWord';

import { RequeteDeGrilleService } from '../service-Requete-de-grille/requete-de-grille.service';


@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})


export class GrilleComponent implements OnInit {
  matriceVide: Array<Array<objetTest>>;
  mots: Mockword[];
  dessu:boolean = false;
  compteur:number=0;


  public constructor(private grilleService: RequeteDeGrilleService) {
    this.matriceVide = this.genererGrille();

  }


  ngOnInit() { }


  genererGrille(): any[][]{
    let matrice: Array<Array<objetTest>> = new Array(TAILLE_TABLEAU);

    for(let i:number = 0; i < TAILLE_TABLEAU; i++){
      let row: Array<objetTest> = new Array(TAILLE_TABLEAU);
      for(let j:number = 0; j < TAILLE_TABLEAU; j++){
        let caseNoir: objetTest = {case:true, mot:"X"};
        row[j] = caseNoir; 
      }
      matrice[i] = row; 
    }
  
    return matrice; 
  }


  myStyle(): string{
    if(!this.dessu)
      return("1")
    return("0")
  }


  getMots(): void {

  }
}
