import { Component, OnInit } from "@angular/core";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { ConfigurationPartie } from "./configurationPartie";

export const REQUETE_INIT: string = "http://localhost:3000/grille/";
const VISIBLE: string = "visible";
const PAS_VISIBLE: string = "pasVisible";
const CREER_OU_JOINDRE: string = "creerOuJoindre";
const DIFFICULTE: string = "difficulte";

@Component({
  selector: "app-config-partie",
  templateUrl: "./config-partie.component.html",
  styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {

  private _requete: string;
  private lesOptions: ConfigurationPartie;

  public constructor(private serviceHTTP: HttpeReqService) {
    this._requete = REQUETE_INIT;
    this.lesOptions = new ConfigurationPartie();
  }

  public ngOnInit(): void {
    document.getElementById(DIFFICULTE).classList.add(VISIBLE);
    document.getElementById(CREER_OU_JOINDRE).classList.add(PAS_VISIBLE);
  }

  public get requete(): string {
    return this._requete;
  }

  public modificationDeRequeteHTTP(): void {
    this.serviceHTTP.modifierRequete(this.requete);
  }

  public apparaitreSection(laSection: string): void {
    document.getElementById(laSection).classList.remove(PAS_VISIBLE);
    document.getElementById(laSection).classList.add(VISIBLE);
  }

  public disparaitreSection(laSection: string): void {
    document.getElementById(laSection).classList.remove(VISIBLE);
    document.getElementById(laSection).classList.add(PAS_VISIBLE);
  }

  public ajouterDifficulte(ajout: string): void {
    if (ajout.length > 0) {
      this.lesOptions.niveauDeDifficulte = ajout;
      this.miseAJourRequete();
      this.serviceHTTP.difficulte = this.lesOptions.niveauDeDifficulte;
    }
  }

  private miseAJourRequete(): void {
    this._requete = REQUETE_INIT + this.lesOptions.niveauDeDifficulte;
  }

}
