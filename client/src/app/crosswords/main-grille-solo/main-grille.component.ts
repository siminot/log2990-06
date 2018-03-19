import { Component, OnInit } from "@angular/core";
import { RequeteDeGrilleAbs } from "../service-Requete-de-Grille/requete-de-grilleAbs";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";

@Component({
  selector: "app-main-grille",
  templateUrl: "./main-grille.component.html",
  styleUrls: ["./main-grille.component.css"],
  providers: [ RequeteDeGrilleAbs, InfojoueurService ]

})
export class MainGrilleComponent implements OnInit {

  public constructor() { }

  public ngOnInit(): void { }
}
