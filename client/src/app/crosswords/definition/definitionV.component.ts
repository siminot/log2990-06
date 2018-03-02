import { Component } from "@angular/core";
import { DefinitionComponent } from "./definition.component";

@Component({
  selector: "app-definitionv",
  templateUrl: "./definition.component.html",
  styleUrls: ["./definition.component.css"]
})

export class DefinitionVComponent extends DefinitionComponent {

  public estVertical: boolean = true;

}
