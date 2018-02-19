import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-config-partie",
  templateUrl: "./config-partie.component.html",
  styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {

  private requete: string = "localhost:3000/grille"; // Changer pour une constante

  public constructor() { }

  public ngOnInit(): void {
    document.getElementById("difficulte").style.display = "none";
    document.getElementById("creerOuJoindre").style.display = "none";
  }

  public apparaitreSection(laSection: string): void {
    // Verifier si block est le bon display
    document.getElementById(laSection).style.display = "block";
  }

  public disparaitreSection(laSection: string): void {
    document.getElementById(laSection).style.display = "none";
  }

  public ajouterDansRequete(ajout: string): void {
    this.requete += ajout;
  }

}
