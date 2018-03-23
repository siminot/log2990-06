import { Component, OnInit } from "@angular/core";
// import { ServiceHttp } from "../serviceHttp/http-request.service";
import { SocketService } from "../service-socket/service-socket";
import { Router } from "@angular/router";
// import { MAT_DIALOG_DATA } from "@angular/material";
// import { InfoJoueurSoloComponent } from "../info-partie/info-joueur-solo/info-joueur-solo.component"
// import { REQUETE_INIT } from "../config-partie/config-partie.component";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["../config-partie/config-partie.component.css"],
})

export class DialogComponent implements OnInit {

  public constructor() {}

  public ngOnInit(): void {
  }

  public rejouer(): void {
    console.log("nouvelle partie");
  }
}
