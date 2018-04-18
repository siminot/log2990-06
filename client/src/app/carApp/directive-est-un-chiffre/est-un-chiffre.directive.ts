import { Directive, Input, HostListener, ElementRef } from "@angular/core";
import * as CONST from "../constants";

@Directive({
    selector: "[appEstUnChiffre]"
})
export class EstUnChiffreDirective {

    @Input()
    public appEstUnChiffre: boolean;

    @Input("categorie")
    public categorie: string;

    @Input("valeur")
    public valeur: number;

    public constructor(private el: ElementRef) { }

    @HostListener("keydown", ["$event"])
    public onKeyDown(event: KeyboardEvent): void {
        if (!this.respectContraintes(event)) {
            event.preventDefault();
        }
    }

    private estUnChiffre(event: KeyboardEvent): boolean {
        return this.estChiffreClavier(event) || this.estChiffreNumPad(event);
    }

    private estChiffreClavier(event: KeyboardEvent): boolean {
        return event.keyCode >= CONST.CHIFFRE_ZERO_KEYCODE && event.keyCode <= CONST.CHIFFRE_NEUF_KEYCODE;
    }

    private estChiffreNumPad(event: KeyboardEvent): boolean {
        return event.keyCode >= CONST.CHIFFRE_ZERO_NUMPAD_KEYCODE && event.keyCode <= CONST.CHIFFRE_NEUF_NUMPAD_KEYCODE;
    }

    private estToucheUtile(event: KeyboardEvent): boolean {
        return event.keyCode === CONST.BACKSPACE_KEYCODE || event.keyCode === CONST.TAB_KEYCODE;
    }

    private respectContraintes(event: KeyboardEvent): boolean {
        if (this.estUnChiffre(event)) {
            const currentValue: number = this.el.nativeElement.value;
            let addValue: number;
            this.estChiffreClavier(event) ? addValue = event.keyCode - CONST.CHIFFRE_ZERO_KEYCODE :
                                            addValue = event.keyCode - CONST.CHIFFRE_ZERO_NUMPAD_KEYCODE;

            const possibleNewValue: number = currentValue * CONST.MULT_PAR_DIX + addValue;
            if (this.categorie === "minutes" || this.categorie === "secondes") {
                return possibleNewValue < CONST.NB_MAX_SEC_MIN ? true : false;
            } else {
                return possibleNewValue < CONST.NB_MAX_MILLISEC ? true : false;
            }
        } else {
            return this.estToucheUtile(event) ? true : false;
        }
    }
}
