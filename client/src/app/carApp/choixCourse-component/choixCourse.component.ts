import { AfterViewInit, Component } from "@angular/core";
import { PisteBD } from "../piste/pisteBD";
import { HttpClient } from "@angular/common/http";
import { GestionnaireBDCourse, PISTES_URL } from "../baseDeDonnee/GestionnaireBDCourse";

@Component({
    selector: "app-choix-course",
    templateUrl: "./choixCourse.component.html",
    styleUrls: ["./choixCourse.component.css"]
})
export class ChoixCourseComponent implements AfterViewInit {

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
    public choisirCourse(piste: PisteBD): void {
        if (piste !== undefined) {
            this.gestionnaireBD.pisteJeu = piste;
        }
    }
}
