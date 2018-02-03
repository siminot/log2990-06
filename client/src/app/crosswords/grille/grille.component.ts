import { Component, OnInit } from "@angular/core";
import { Word } from "../mockObject/word";
import { TAILLE_TABLEAU } from "../constantes";
import { lettreGrille } from "../mockObject/word";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { MaterialCreator } from "three";

@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

export class GrilleComponent implements OnInit {
  private mots: Word[];
  private matriceDesMotsSurGrille: Array<Array<lettreGrille>>;
  // private motsAAfiicher: String[];
  // private dessu: boolean;
  // private compteur: number;

  public constructor(private listeMotsService: RequeteDeGrilleService) {
    this.matriceDesMotsSurGrille = this.genererGrille();
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
        let caseNoir: lettreGrille = {case:true, lettre:"1", caseDecouverte:false};
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
    // this.matriceDesMotsSurGrille[this.mots[0].premierX][this.mots[0].premierY].mot = this.mots[0].mots[0];
    // this.matriceDesMotsSurGrille[this.mots[0].premierX][this.mots[0].premierY].lettre = true;
      
    // console.log(this.matriceDesMotsSurGrille);
    // let tmp: lettreGrille = {case:true,lettre:"A",caseDecouverte:true};
    // this.matriceDesMotsSurGrille[0][0] = tmp;


    for (let objMot of this.mots) {
      let tmpLettreGrille:lettreGrille;
      for (let indice:number = 0 ; indice < objMot.longeur ; indice++) {
        tmpLettreGrille = {
          case: true,
          lettre: objMot.mots[indice],
          caseDecouverte: true
        };
        if(objMot.vertical) {
          this.matriceDesMotsSurGrille[objMot.premierX][indice + objMot.premierY]= tmpLettreGrille;
        } else {
          this.matriceDesMotsSurGrille[indice + objMot.premierX][objMot.premierY]= tmpLettreGrille;
        }
      }
    }
  }
}
