import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import {GrilleComponent} from "../grille/grille.component";

@Directive({ selector: "[appDirectiveFocus]" })

export class DirectiveFocusDirective {

  constructor(private el: ElementRef) { }

    @Input() appDirectiveFocus: boolean;

    @HostListener('keydown', ['$event']) onKeyDown(event) {
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
