import { Component, OnInit } from "@angular/core";
import { Word } from "../mockObject/word";
import { Subscription } from 'rxjs/Subscription';

import { lettreGrille } from "../mockObject/word";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";

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
    // this.mots = this.listeMotsService.getMots();
    // this.matriceDesMotsSurGrille = this.listeMotsService.getMatrice();
    this.subscriptionMots = this.listeMotsService.serviceReceptionMots().subscribe(mots => this.mots = mots);
    this.subscriptionMatrice = this.listeMotsService.serviceReceptionMatriceLettres().subscribe(matrice => this.matriceDesMotsSurGrille = matrice);
    console.log(this.matriceDesMotsSurGrille);
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
