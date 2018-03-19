import { AfterViewInit, Component } from "@angular/core";
import { UtilisateurBD } from "../baseDeDonnee/utilisateurBD";

@Component({
    selector: "app-admin",
    templateUrl: "./administrateur.component.html",
    styleUrls: ["./administrateur.component.css"]
})
export class AdministrateurComponent implements AfterViewInit {

    public baseDonnees: UtilisateurBD;

    public constructor() {
        this.baseDonnees = new UtilisateurBD();
    }

    public ngAfterViewInit(): void { }
}
