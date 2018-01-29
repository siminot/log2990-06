import { Component, OnInit } from "@angular/core";
//import {Mockword} from "../mockObject/mockWord";
//import{objetTest} from "../mockObject/mockWord";
import {TAILLE_TABLEAU} from "../constantes";
@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})
export class GrilleComponent implements OnInit {
  
  genererGrille(): any[][]{
    let matrice: Array<Array<boolean>> = new Array(TAILLE_TABLEAU);

    for(let i:number = 0; i < TAILLE_TABLEAU; i++){
      let row: Array<boolean> = new Array(TAILLE_TABLEAU);
      for(let j:number = 0; j < TAILLE_TABLEAU; j++){
       let kalise: boolean = true;
       row[j] = kalise; 
    }
    matrice[i] = row; 
  }
  
  return matrice; 
}

tabarnak: Array<Array<boolean>> = this.genererGrille();
 
 public constructor() { }

 ngOnInit() {}

  

}
