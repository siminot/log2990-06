import { Component, OnInit } from "@angular/core";
import { RequeteDeGrilleAbs } from "../service-Requete-de-Grille/requete-de-grilleAbs";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
@Component({
  selector: "app-main-grille-creer",
  templateUrl: "./main-grille-creer.component.html",
  styleUrls: ["../main-grille/main-grille.component.css"],
  providers: [ RequeteDeGrilleAbs, InfojoueurService ]
})
export class MainGrilleCreerComponent implements OnInit {

  public constructor() { }

  public ngOnInit(): void {
  }

}
