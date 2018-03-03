import { Component, OnInit } from "@angular/core";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { Difficulte } from "../../../../../common/communication/IConfigurationPartie";

export const REQUETE_INIT: string = "http://localhost:3000/grille/";

@Component({
  selector: "app-config-partie",
  templateUrl: "./config-partie.component.html",
  styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {

  public constructor(private serviceHTTP: HttpeReqService) { }

  public ngOnInit(): void {
    document.getElementById("difficulte").classList.add("pasVisible");
    document.getElementById("creerOuJoindre").classList.add("pasVisible");
  }

  public apparaitreSection(laSection: string): void {
    document.getElementById(laSection).classList.remove("pasVisible");
    document.getElementById(laSection).classList.add("visible");
  }

  public disparaitreSection(laSection: string): void {
    document.getElementById(laSection).classList.remove("visible");
    document.getElementById(laSection).classList.add("pasVisible");
  }

  public ajouterDifficulte(difficulte: Difficulte): void {
    if (difficulte !== undefined) {
      this.serviceHTTP.difficulte = difficulte;
    }
  }
}
