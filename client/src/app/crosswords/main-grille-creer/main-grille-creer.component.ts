import { Component, OnInit } from "@angular/core";
import { ServiceInteractionComponent } from "../service-interaction-component/service-interaction-component";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
@Component({
  selector: "app-main-grille-creer",
  templateUrl: "./main-grille-creer.component.html",
  styleUrls: ["../main-grille-solo/main-grille.component.css"],
  providers: [ ServiceInteractionComponent, InfojoueurService ]
})
export class MainGrilleCreerComponent implements OnInit {

  public constructor() { }

  public ngOnInit(): void {
  }

}
