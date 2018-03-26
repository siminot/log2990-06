import { AfterViewInit, Component } from "@angular/core";
import { PisteBD } from "../piste/IPisteBD";
import { HttpClient } from "@angular/common/http";
import { GestionnaireBDCourse, PISTES_URL } from "../baseDeDonnee/GestionnaireBDCourse";

@Component({
    selector: "app-admin",
    templateUrl: "./administrateur.component.html",
    styleUrls: ["./administrateur.component.css"]
})
export class AdministrateurComponent implements AfterViewInit {

    public pistes: PisteBD[];

    public constructor(private http: HttpClient,
                       private gestionnaireBD: GestionnaireBDCourse) { }

    public ngAfterViewInit(): void {
      this.obtenirPistes();
    }

    public obtenirPistes(): void {
      this.http.get<PisteBD[]>(PISTES_URL)
      .subscribe((pistes) => this.pistes = pistes);
    }
    public editerPiste(piste: PisteBD): void {
      this.gestionnaireBD.pisteEdition = piste;
    }

    public supprimerPiste(piste: PisteBD): void {
      this.gestionnaireBD.supprimerPiste(piste);
    }
}
