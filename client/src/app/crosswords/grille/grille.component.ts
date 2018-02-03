import { Component, OnInit } from "@angular/core";
import { Word } from "../mockObject/word";
import { Subscription } from 'rxjs/Subscription';

import { lettreGrille } from "../mockObject/word";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
// import { MaterialCreator } from "three";

@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

export class GrilleComponent implements OnInit {
  private mots: Word[];
  private matriceDesMotsSurGrille: Array<Array<lettreGrille>>;
  private subscriptionMots: Subscription;
  private subscriptionMatrice: Subscription;
  // private motsAAfiicher: String[];
  // private dessu: boolean;
  // private compteur: number;

  public constructor(private listeMotsService: RequeteDeGrilleService) {
    this.subscriptionMots = this.listeMotsService.serviceReceptionMots().subscribe(mots => this.mots = mots);
    this.subscriptionMatrice = this.listeMotsService.serviceReceptionMatriceLettres().subscribe(matrice => this.matriceDesMotsSurGrille = matrice);
  }

  ngOnInit() {

  }


  envoieMots(): void {
    this.listeMotsService.serviceEnvoieMots(this.mots);
  }
  
  envoieMatrice(): void {
    this.listeMotsService.serviceEnvoieMatriceLettres(this.matriceDesMotsSurGrille);
  }

  opacite(etat:boolean): String {
    if(!etat)
      return("0")
    return("1")
  }
}
