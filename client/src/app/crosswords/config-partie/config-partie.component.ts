import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-config-partie",
  templateUrl: "./config-partie.component.html",
  styleUrls: ["./config-partie.component.css"]
})
export class ConfigPartieComponent implements OnInit {

  public constructor() { }

  public ngOnInit(): void {
    document.getElementById("difficulte").style.display = "none";
    document.getElementById("creerOuJoindre").style.display = "none";
  }

}
