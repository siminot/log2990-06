import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {

    public retirerBackgroundImage(): void {
        document.getElementById("bg").id = "nobg";
    }

    public remettreImageBackground(): void {
        document.getElementById("nobg").id = "bg";
    }
 }
