import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-enregistrement-piste",
  templateUrl: "./enregistrement-piste.component.html",
  styleUrls: ["./enregistrement-piste.component.css"]
})
export class EnregistrementPisteComponent implements OnInit {

  public constructor(private nom: string, private description: string) { }

  ngOnInit() {
  }

  public sauvegarder(): {
  }

}
