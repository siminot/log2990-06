import { Directive, HostListener, Input } from "@angular/core";

const LETTRE_A: number = 65; // a
const LETTRE_Z: number = 90; // z

@Directive({ selector: "[appDirectiveFocus]" })
export class DirectiveFocusDirective {

  public constructor() { }

  @Input() public appDirectiveFocus: boolean;

  @HostListener("keydown", ["$event"])
  public onKeyDown(event: KeyboardEvent): void {
        if (this.appDirectiveFocus) {
            if (event.keyCode < LETTRE_A || event.keyCode > LETTRE_Z) {
              event.preventDefault();
            } else if ((event.keyCode >= LETTRE_A && event.keyCode <= LETTRE_Z)) {
              return;
            }
        }
    }
}
