import { Directive, ElementRef, Renderer, OnInit, Input } from "@angular/core";

@Directive({ selector: "[appDirectiveFocus]" })
export class DirectiveFocusDirective implements OnInit {

  @Input("appDirectiveFocus") public isFocused: boolean;

  public constructor(private hostElement: ElementRef, private renderer: Renderer) { }

  public ngOnInit(): void {
    if (this.isFocused) {
     console.log("test1");
}
  }
}