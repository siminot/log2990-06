import { Directive, HostListener, Input } from "@angular/core";

const LETTRE_A: string = "a";
const LETTRE_Z: string = "z";

@Directive({ selector: "[appDirectiveFocus]" })
export class DirectiveFocusDirective {

  public constructor() { }

  @Input()
  public appDirectiveFocus: boolean;

  @HostListener("keydown", ["$event"])
  public onKeyDown(event: KeyboardEvent): void {
      if (this.appDirectiveFocus && !this.estUneLettre(event)) {
        event.preventDefault();
      }
  }

  private estUneLettre(event: KeyboardEvent): boolean {
    return event.key >= LETTRE_A &&
           event.key <= LETTRE_Z;
  }
}
