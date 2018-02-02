import { Component, OnInit } from "@angular/core";
import { Mockword } from "../mockObject/mockWord";
import { TAILLE_TABLEAU } from "../constantes";
import { lettreGrille } from "../mockObject/mockWord";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";


@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

export class GrilleComponent implements OnInit {
  mots:Mockword[];
  motsAAfiicher:String[];
  matriceVide: Array<Array<lettreGrille>>;
  dessu:boolean; 
  compteur:number;


  public constructor(private listeMotsService: RequeteDeGrilleService) {
    this.matriceVide = this.genererGrille();
    this.compteur = 0;
    this.dessu = false;
  }

  ngOnInit() {
    this.getMots();
    this.putWordsInGrid();
  }

  genererGrille(): Array<Array<lettreGrille>>{
    let matrice: Array<Array<lettreGrille>> = new Array(TAILLE_TABLEAU);

    for(let i:number = 0; i < TAILLE_TABLEAU; i++){
      let row: Array<lettreGrille> = new Array(TAILLE_TABLEAU);
      for(let j:number = 0; j < TAILLE_TABLEAU; j++){
        let caseNoir:lettreGrille;

        if(j%2==0)
          caseNoir = {case:true, mot:"X", lettre:false};
        else
          caseNoir = {case:true, mot:"P", lettre:false};
        
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
