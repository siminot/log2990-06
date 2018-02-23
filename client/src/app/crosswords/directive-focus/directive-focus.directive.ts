import { Directive, HostListener, Input } from "@angular/core";

@Directive({ selector: "[appDirectiveFocus]" })

export class DirectiveFocusDirective {

  public constructor() { }

  @Input() public appDirectiveFocus: boolean;

  @HostListener("keydown", ["$event"]) public onKeyDown(event: {}) {
        const e = event as KeyboardEvent;

        if (this.appDirectiveFocus) {
            if (e.keyCode < 65 || e.keyCode > 90) {
              e.preventDefault();
            } else if ((e.keyCode >= 65 && e.keyCode <= 90)) {
              return;
            }
        }
    }
}
