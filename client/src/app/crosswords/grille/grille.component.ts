import { Component, OnInit } from "@angular/core";

import { TAILLE_TABLEAU } from "../constantes";
import { objetTest } from "../mockObject/mockWord";
import { Mockword } from '../mockObject/mockWord';

import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';


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


  public constructor(private motsGrilleService: RequeteDeGrilleService) {
    this.matriceVide = this.genererGrille();
  }


  ngOnInit() { this.getMots(); console.log(this.mots);}


  genererGrille(): any[][]{
    let matrice: Array<Array<objetTest>> = new Array(TAILLE_TABLEAU);

    for(let i:number = 0; i < TAILLE_TABLEAU; i++){
      let row: Array<objetTest> = new Array(TAILLE_TABLEAU);
      for(let j:number = 0; j < TAILLE_TABLEAU; j++){
        let caseNoir:objetTest;
        if(j%2==0){
          caseNoir = {case:true, mot:"X"};
        }
        else
        {
          caseNoir = {case:true, mot:"P"};
        }
        row[j] = caseNoir; 
      }
      matrice[i] = row; 
    }
  
    return matrice; 
  }


<<<<<<< HEAD
  myStyle(): string{
    if(!this.dessu)
=======
  
  dessu:boolean = false; 
  compteur:number=0;

  myStyle(etat:boolean): string{
    if(!etat)
>>>>>>> 58087bba48adfb903a58fed763d18e10dbf92b80
      return("1")
    return("0")
  }


  getMots(): void {
    this.motsGrilleService.getMots().subscribe(mots => this.mots = mots);
  }
}
