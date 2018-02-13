import { Directive, OnInit, Input} from "@angular/core";
import {GrilleComponent} from "../grille/grille.component";

@Directive({ selector: "[appDirectiveFocus]" })

export class DirectiveFocusDirective implements OnInit {

  @Input("appDirectiveFocus") public isFocused: boolean;

  public constructor(private prvtCmpt: GrilleComponent) { }

  public ngOnInit(): void {
    if (this.isFocused) {
      console.log("test");
      this.prvtCmpt.prnt();
    }
  }
}
