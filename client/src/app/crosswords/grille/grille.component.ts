import { Component, OnInit } from "@angular/core";
import { Word } from "../mockObject/word";
import { TAILLE_TABLEAU , caseNoir } from "../constantes";
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

  chaine: String;


  public constructor(private listeMotsService: RequeteDeGrilleService) {
    this.matriceVide = this.genererGrille();
    this.compteur = 0;
    this.dessu = false;
  }

  ngOnInit() {
    this.getMots();
    this.getChaine();
    this.putWordsInGrid();
  }

  genererGrille(): Array<Array<lettreGrille>>{
    let matrice: Array<Array<lettreGrille>> = new Array(TAILLE_TABLEAU);

    for(let i:number = 0; i < TAILLE_TABLEAU; i++){
      let row: Array<lettreGrille> = new Array(TAILLE_TABLEAU);
      for(let j:number = 0; j < TAILLE_TABLEAU; j++) {
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

  getChaine(): void {
    this.listeMotsService.getChaine().subscribe(chaine => this.chaine = chaine);
  }

  putWordsInGrid(): void {
    
  }
}
