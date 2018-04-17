import { Directive, Input, HostListener, ElementRef } from "@angular/core";
import { CHIFFRE_ZERO, CHIFFRE_NEUF, TAB_KEYCODE, BACKSPACE_KEYCODE } from "../constants";

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
    return event.keyCode >= 48 && event.keyCode <= 57;
  }

  private estToucheUtile(event: KeyboardEvent): boolean {
    return event.keyCode === BACKSPACE_KEYCODE || event.keyCode === TAB_KEYCODE;
  }

  private respectContraintes(event: KeyboardEvent): boolean {
    if (this.estUnChiffre(event)) {
      if (this.categorie === "minutes") {
        const currentValue: number = this.el.nativeElement.value;
        const addValue: number = event.keyCode - 48;
        const possibleNewValue: number = currentValue * 10 + addValue;

        return possibleNewValue < 60 ? true : false;
      }
    } else if (this.estToucheUtile(event)) {
      return true;
    } else {
      return false;
    }
  }
}
