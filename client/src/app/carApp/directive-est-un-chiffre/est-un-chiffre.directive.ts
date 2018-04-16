import { Directive, Input, HostListener } from "@angular/core";
import { CHIFFRE_UN, CHIFFRE_NEUF } from "../constants";

@Directive({
  selector: "[appEstUnChiffre]"
})
export class EstUnChiffreDirective {

    @Input()
    public appEstUnChiffre: boolean;

    public constructor() { }

    @HostListener("keydown", ["$event"])
    public onKeyDown(event: KeyboardEvent): void {
      if (this.appEstUnChiffre && !this.estUnChifre(event)) {
        event.preventDefault();
      }
    }

    private estUnChifre(event: KeyboardEvent): boolean {
      return event.key >= CHIFFRE_UN && event.key <= CHIFFRE_NEUF;
    }
}
