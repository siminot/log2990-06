import { Component, OnInit } from '@angular/core';
import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';
import { Mockword } from "../mockObject/mockWord";

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {
  mots:Mockword[];
  
  constructor(private listeMotsService: RequeteDeGrilleService) { }

  ngOnInit() {
    this.getMots();
    console.log(this.mots);
  }


  getMots(): void {
    this.listeMotsService.getMots().subscribe(mots => this.mots = mots);
  }
}
