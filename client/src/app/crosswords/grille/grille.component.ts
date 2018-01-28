import { Component, OnInit } from "@angular/core";
import {mockWord} from "../mockObject/mockWord";
@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})
export class GrilleComponent implements OnInit {


  public vertical: number = 0;
  public horizontal: number = 0;

  public genererClassVertical(): string {
    return String(this.vertical++);
  }

  public genererClassHorizontal(): string {
   return String(this.horizontal++);
 }

  public constructor() { }



  public ngOnInit() {
  }

}
