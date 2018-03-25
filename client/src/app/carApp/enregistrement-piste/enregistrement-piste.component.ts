import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-enregistrement-piste",
  templateUrl: "./enregistrement-piste.component.html",
  styleUrls: ["./enregistrement-piste.component.css"]
})
export class EnregistrementPisteComponent implements OnInit {

  public constructor(public nom: string, public description: string) {}

  public ngOnInit(): void {
  }

  public sauvegarder(): void {
    JSON.stringify({
      "nom": this.nom, "description": this.description
    });
  }

}
