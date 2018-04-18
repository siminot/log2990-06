import { Directive, Input, HostListener } from "@angular/core";
import * as CONST from "../constants";

@Directive({
  selector: "[appNbCaractMax]"
})
export class NbCaractMaxDirective {

  @Input()
  private appNbCaractMax: string;

  public constructor() { }

  @HostListener("keydown", ["$event"])
  public onKeyDown(event: KeyboardEvent): void {
    
  }

}
