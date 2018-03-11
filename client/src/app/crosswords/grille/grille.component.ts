import { Component, OnInit } from "@angular/core";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "./encadrementCase";
import { GrilleAbs } from "./grilleAbs";

@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

export class GrilleComponent extends GrilleAbs implements OnInit {

  public constructor(private listeMotsService: RequeteDeGrilleService,
                     _servicePointage: InfojoueurService) {
    super(_servicePointage);
  }

  public ngOnInit(): void {
  }

  protected envoieMotSelectionne(): void {
    this.listeMotsService.serviceEnvoieMotSelectionne(this.motSelectionne);
  }

  public switchCheatMode(): void {
    for (const mot of this.mots) {
      mot.cheat = !mot.cheat;
    }
    this.listeMotsService.serviceEnvoieMots(this.mots);
  }
}
