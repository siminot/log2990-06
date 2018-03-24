import { AfterViewInit, Component } from "@angular/core";
import { UtilisateurBD } from "../baseDeDonnee/utilisateurBD";
import { PisteBD } from "../piste/pisteBD";

@Component({
    selector: "app-admin",
    templateUrl: "./administrateur.component.html",
    styleUrls: ["./administrateur.component.css"]
})
export class AdministrateurComponent implements AfterViewInit {

    public pistes: PisteBD[];

    public constructor() {

    }

    public ngAfterViewInit(): void {
      this.obtenirPistes();
    }

    public obtenirPistes(): void {

    }
    public editerPiste(piste: PisteBD): void {

    }

    public supprimerPiste(piste: PisteBD): void {

    }
}
