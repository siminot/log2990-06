import { Component, OnInit } from "@angular/core";
const REQUETE_INIT: string = "localhost:3000/grille";

@Component({
  selector: "app-config-partie",
  templateUrl: "./config-partie.component.html",
  styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {

  private requete: string; // Changer pour une constante
  private estSolo: boolean;

  public constructor() {
    this.requete = REQUETE_INIT;
    this.estSolo = false;
  }

  public ngOnInit(): void {
    document.getElementById("difficulte").classList.add("pasVisible");
    document.getElementById("creerOuJoindre").classList.add("pasVisible");
  }

  public get getRequete(): string {
    return this.requete;
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
