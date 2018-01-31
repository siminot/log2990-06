import { Component, OnInit } from "@angular/core";
import { Mockword } from "../mockObject/mockWord";
import { TAILLE_TABLEAU } from "../constantes";
import { objetTest } from "../mockObject/mockWord";
import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';


@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})


export class GrilleComponent implements OnInit {
  mots:Mockword[];
  matriceVide: Array<Array<objetTest>>;
  dessu:boolean; 
  compteur:number;


  public constructor(private listeMotsService: RequeteDeGrilleService) {
    this.matriceVide = this.genererGrille();
    this.compteur = 0;
    this.dessu = false;
  }


  ngOnInit() { 
    this.getMots();
  }


  genererGrille(): any[][]{
    let matrice: Array<Array<objetTest>> = new Array(TAILLE_TABLEAU);

    for(let i:number = 0; i < TAILLE_TABLEAU; i++){
      let row: Array<objetTest> = new Array(TAILLE_TABLEAU);
      for(let j:number = 0; j < TAILLE_TABLEAU; j++){
        let caseNoir:objetTest;

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
      return("1")
    return("0")
  }

  
  getMots(): void {
    this.listeMotsService.getMots().subscribe(mots => this.mots = mots);
  }
}
