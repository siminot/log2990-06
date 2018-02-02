import { Component, OnInit, Input } from "@angular/core";
import { Word } from "../mockObject/word";
import { TAILLE_TABLEAU } from "../constantes";
import { lettreGrille } from "../mockObject/word";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";

@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

export class GrilleComponent implements OnInit {
  mots: Word[];
  motsAAfiicher: String[];
  matriceVide: Array<Array<lettreGrille>>;
  dessu: boolean;
  compteur: number;



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
      for(let j:number = 0; j < TAILLE_TABLEAU; j++) {
        let caseNoir: lettreGrille = {case:true, mot:"1", lettre:false};
        row[j] = caseNoir;
      }
      matrice[i] = row;
    }
    return matrice;
  }

  myStyle(etat:boolean): String {
    if(!etat)
      return("0")
    return("1")
  }

  getMots(): void {
    this.listeMotsService.getMots().subscribe(mots => this.mots = mots);
  }

  putWordsInGrid(): void {
    // this.matriceVide[this.mots[0].premierX][this.mots[0].premierY].mot = this.mots[0].mots[0];
    // this.matriceVide[this.mots[0].premierX][this.mots[0].premierY].lettre = true;
      
    // console.log(this.matriceVide);
    let tmp: lettreGrille = {case:true,mot:"A",lettre:true};
    this.matriceVide[0][0].mot = "A";
  }
}
