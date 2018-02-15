import { Directive, HostListener, Input } from '@angular/core';

@Directive({ selector: "[appDirectiveFocus]" })

export class DirectiveFocusDirective {

  constructor() { }

    @Input() appDirectiveFocus: boolean;

    @HostListener('keydown', ['$event']) onKeyDown(event: any) {
        let e = <KeyboardEvent> event;

        if (this.appDirectiveFocus) {
            if (e.keyCode < 65 || e.keyCode > 90) {
              e.preventDefault();
            } else if ((e.keyCode >= 65 && e.keyCode <= 90)) {
              return;
            }
        }
    }
}
