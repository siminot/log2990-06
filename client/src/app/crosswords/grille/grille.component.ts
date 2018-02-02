import { Component, OnInit } from "@angular/core";
import { Mockword, objetTest } from "../mockObject/mockWord";
import { TAILLE_TABLEAU } from "../constantes";
import { lettreGrille } from "../mockObject/mockWord";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";


@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

export class GrilleComponent implements OnInit {
<<<<<<< HEAD
  private mots: Mockword[];
  private motsAAfficher: String[];
  private matriceVide: Array<Array<objetTest>>;
  private dessu: boolean;
  private compteur: number;
=======
  mots:Mockword[];
  motsAAfiicher:String[];
  matriceVide: Array<Array<lettreGrille>>;
  dessu:boolean; 
  compteur:number;

>>>>>>> f87546f5eaa01cc4dc53cd1dc06711fa64acefb6

  public constructor(private listeMotsService: RequeteDeGrilleService) {
    this.matriceVide = this.genererGrille();
    this.compteur = 0;
    this.dessu = false;
  }

  ngOnInit() {
    this.getMots();
    this.putWordsInGrid();
  }

<<<<<<< HEAD
  private genererGrille(): Array<Array<objetTest>> {
    let matrice: Array<Array<objetTest>> = new Array(TAILLE_TABLEAU);

    for (let i: number = 0; i < TAILLE_TABLEAU; i++){
      let row: Array<objetTest> = new Array(TAILLE_TABLEAU);
      for (let j: number = 0; j < TAILLE_TABLEAU; j++){
        let caseNoir: objetTest;
=======

  genererGrille(): Array<Array<lettreGrille>>{
    let matrice: Array<Array<lettreGrille>> = new Array(TAILLE_TABLEAU);

    for(let i:number = 0; i < TAILLE_TABLEAU; i++){
      let row: Array<lettreGrille> = new Array(TAILLE_TABLEAU);
      for(let j:number = 0; j < TAILLE_TABLEAU; j++){
        let caseNoir:lettreGrille;
>>>>>>> f87546f5eaa01cc4dc53cd1dc06711fa64acefb6

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
