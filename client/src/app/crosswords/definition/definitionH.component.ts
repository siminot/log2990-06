import { Component } from "@angular/core";
import { DefinitionComponent } from "./definition.component";

@Component({
  selector: "app-definitionh",
  templateUrl: "./definition.component.html",
  styleUrls: ["./definition.component.css"]
})

export class DefinitionHComponent extends DefinitionComponent {

  public estVertical: boolean = false;

}
