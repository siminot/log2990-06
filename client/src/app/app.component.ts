import { Component, AfterViewChecked } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewChecked {

    public constructor(private router: Router) {
    }

    public ngAfterViewChecked(): void {
        this.router.url === "/" ? this.remettreImageBackground() : this.retirerBackgroundImage();
    }

    public retirerBackgroundImage(): void {
        const bg: HTMLElement = document.getElementById("bgHome");
        if (bg !== null) {
            bg.id = "nobgHome";
        }
    }

    public remettreImageBackground(): void {
        const bg: HTMLElement = document.getElementById("nobgHome");
        if (bg !== null) {
            bg.id = "bgHome";
        }
    }
 }
