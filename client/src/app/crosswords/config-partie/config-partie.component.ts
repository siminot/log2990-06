import { Component, OnInit } from "@angular/core";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { ConfigurationPartie } from "./configurationPartie";

export const REQUETE_INIT: string = "http://localhost:3000/grille/";

@Component({
  selector: "app-config-partie",
  templateUrl: "./config-partie.component.html",
  styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {

  private requete: string;
  private lesOptions: ConfigurationPartie;

  public constructor(private serviceHTTP: HttpeReqService) {
    this.requete = REQUETE_INIT;
    this.lesOptions = new ConfigurationPartie();
  }

  public ngOnInit(): void {
    document.getElementById("difficulte").classList.add("pasVisible");
    document.getElementById("creerOuJoindre").classList.add("pasVisible");
  }

  public get getRequete(): string {
    return this.requete;
  }

  public modificationDeRequeteHTTP(): void {
    this.serviceHTTP.modifierRequete(this.getRequete);
  }

  public apparaitreSection(laSection: string): void {
    document.getElementById(laSection).classList.remove("pasVisible");
    document.getElementById(laSection).classList.add("visible");
  }

  public disparaitreSection(laSection: string): void {
    document.getElementById(laSection).classList.remove("visible");
    document.getElementById(laSection).classList.add("pasVisible");
  }

  public ajouterDifficulte(ajout: string): void {
    if (ajout !== "") {
      this.lesOptions.niveauDeDifficulte = ajout;
      this.miseAJourRequete();
      this.serviceHTTP.difficulte = this.lesOptions.niveauDeDifficulte;
    }
  }

  private miseAJourRequete(): void {
    this.requete = REQUETE_INIT + this.lesOptions.niveauDeDifficulte;
  }

}
