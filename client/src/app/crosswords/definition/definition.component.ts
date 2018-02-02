import { Component, OnInit } from '@angular/core';
import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';
import { Word } from "../mockObject/word";

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {
  private mots: Word[];
  chaine: String;
  
  constructor(private listeMotsService: RequeteDeGrilleService) { }

  ngOnInit() {
    this.getMots();
    this.getChaine();
  }

  getMots(): void {
    this.listeMotsService.getMots().subscribe(mots => this.mots = mots);
  }

  getChaine(): void {
    this.listeMotsService.getChaine().subscribe(chaine => this.chaine = chaine);
  }

  
}
