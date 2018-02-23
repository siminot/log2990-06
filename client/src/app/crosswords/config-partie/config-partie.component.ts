import { Component, OnInit } from "@angular/core";
import {HttpeReqService} from "../httpRequest/http-request.service";
const REQUETE_INIT: string = "http://localhost:3000/grille";

@Component({
  selector: "app-config-partie",
  templateUrl: "./config-partie.component.html",
  styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {

  private requete: string; // Changer pour une constante

  public constructor(private serviceHTTP: HttpeReqService) {
    this.requete = REQUETE_INIT;
  }

  public ngOnInit(): void {
    document.getElementById("difficulte").classList.add("pasVisible");
    document.getElementById("creerOuJoindre").classList.add("pasVisible");
  }

  public get getRequete(): string {
    return this.requete;
  }

  public modificationDeRequeteHTTP(): void {
    this.serviceHTTP.modifierRequete(this.requete);
  }

  public apparaitreSection(laSection: string): void {
    document.getElementById(laSection).classList.remove("pasVisible");
    document.getElementById(laSection).classList.add("visible");
  }

  public disparaitreSection(laSection: string): void {
    document.getElementById(laSection).classList.remove("visible");
    document.getElementById(laSection).classList.add("pasVisible");
  }

  public ajouterDansRequete(ajout: string): void {
    if (ajout.length === 0) {
      return;
    } else if (ajout[0] !== "/") {
      return;
    }
    this.requete += ajout;
  }

}
