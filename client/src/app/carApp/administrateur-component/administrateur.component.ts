import { AfterViewInit, Component } from "@angular/core";
import { PisteBD } from "../piste/pisteBD";
import { HttpClient } from "@angular/common/http";
@Component({
    selector: "app-admin",
    templateUrl: "./administrateur.component.html",
    styleUrls: ["./administrateur.component.css"]
})
export class AdministrateurComponent implements AfterViewInit {

    public pistes: PisteBD[];
    private readonly pistesURL: string = "http://localhost:3000/apipistes";
    private readonly supprimerPisteURL: string = "http://localhost:3000/apipistes/supprimer/";

    public constructor(private http: HttpClient) {

    }

    public ngAfterViewInit(): void {
      this.obtenirPistes();

    }

    public obtenirPistes(): void {
      this.http.get<PisteBD[]>(this.pistesURL)
      .subscribe((pistes) => this.pistes = pistes);
    }
    public editerPiste(piste: PisteBD): void {

    }

    public supprimerPiste(piste: PisteBD): void {
      this.http.delete(this.supprimerPisteURL + piste.nom);
    }
}
