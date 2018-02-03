import { Component, OnInit } from '@angular/core';
import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';
import { Word } from "../mockObject/word";
import { Subscription } from 'rxjs/Subscription';
import { lettreGrille } from '../mockObject/word';

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {
  private mots: Word[];
  private matriceDesMotsSurGrille: Array<Array<lettreGrille>>;
  private subscriptionMots: Subscription;
  private subscriptionMatrice: Subscription;
  
  constructor(private listeMotsService: RequeteDeGrilleService) {
    this.mots = this.listeMotsService.getMots();
    this.matriceDesMotsSurGrille = this.listeMotsService.getMatrice();
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

}
