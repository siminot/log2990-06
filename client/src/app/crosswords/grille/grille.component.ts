import { Component, OnInit } from "@angular/core";
//import {Mockword} from "../mockObject/mockWord";
//import{objetTest} from "../mockObject/mockWord";
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
       let kalise: objetTest = {case:true, mot:"XXX"};
       row[j] = kalise; 
    }
    matrice[i] = row; 
  }
  
  return matrice; 
}

tabarnak: Array<Array<objetTest>> = this.genererGrille();
 
 public constructor() { }

 ngOnInit() {}

  

}
