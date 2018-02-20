import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-config-partie",
  templateUrl: "./config-partie.component.html",
  styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {

  private requete: string; // Changer pour une constante

  public constructor() {
    this.requete = "localhost:3000/grille";
  }

  public ngOnInit(): void {
    document.getElementById("difficulte").style.display = "none";
    document.getElementById("creerOuJoindre").style.display = "none";
  }

  public get getRequete(): string {
    return this.requete;
  }

  public apparaitreSection(laSection: string): void {
    // Verifier si block est le bon display
    document.getElementById(laSection).classList.remove("pasVisible");
    document.getElementById(laSection).classList.add("visible");
    document.getElementById(laSection).style.display = "block";
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
