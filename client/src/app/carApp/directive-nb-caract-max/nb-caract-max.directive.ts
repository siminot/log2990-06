import { Directive, Input, HostListener, ElementRef } from "@angular/core";
import * as CONST from "../constants";

@Directive({
    selector: "[appNbCaractMax]"
})
export class NbCaractMaxDirective {

    @Input()
    private appNbCaractMax: string;

    public constructor(private el: ElementRef) {
    }

    @HostListener("keyup", ["$event"])
    public onKeyUp(event: KeyboardEvent): void {
        if (this.el.nativeElement.value.length > +this.appNbCaractMax) {
            event.preventDefault();
        }
    }

}
