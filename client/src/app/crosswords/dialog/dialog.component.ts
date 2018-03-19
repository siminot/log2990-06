import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { REQUETE_INIT } from "../config-partie/config-partie.component";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.css"],
})

export class DialogComponent implements OnInit {

  public constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  public ngOnInit(): void {
  }

  public rejouer(difficulte: string): void {
    console.log("nouvelle partie", difficulte);
  }

}
