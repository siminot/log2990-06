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

  public requeteEstSolo(): void {
    this.estSolo = true;
  }

  public apparaitreSection(laSection: string): void {
    // Verifier si block est le bon display
    document.getElementById(laSection).classList.remove("pasVisible");
    document.getElementById(laSection).classList.add("visible");
    // document.getElementById(laSection).style.display = "flex";
  }

  public disparaitreSection(laSection: string): void {
    document.getElementById(laSection).classList.remove("visible");
    document.getElementById(laSection).classList.add("pasVisible");
    // document.getElementById(laSection).style.display = "none";
  }

  public ajouterDansRequete(ajout: string): void {
    // On veut seulement ajouter des requetes valides
    if (ajout.length === 0) {
      return;
    } else if (ajout[0] !== "/") {
      return;
    }
    this.requete += ajout;
  }

}
