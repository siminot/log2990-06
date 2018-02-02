import { Component, OnInit } from "@angular/core";
//import {Mockword} from "../mockObject/mockWord";
import {TAILLE_TABLEAU} from "../constantes";
import { objetTest } from "../mockObject/mockWord";


@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})


export class GrilleComponent implements OnInit {
  
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


  
  dessu:boolean = false; 
  compteur:number=0;

  myStyle(): string{
    if(!this.dessu)
      return("1")
    return("0")

  }
  matriceVide: Array<Array<objetTest>>;
  public constructor() {
    this.matriceVide = this.genererGrille();






   }

  ngOnInit() { }
}
