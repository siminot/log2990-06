import { AfterViewInit, Component } from "@angular/core";
import { PisteBD } from "../piste/pisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

@Component({
    selector: "app-choix-course",
    templateUrl: "./choixCourse.component.html",
    styleUrls: ["./choixCourse.component.css"]
})
export class ChoixCourseComponent implements AfterViewInit {

    public pistes: PisteBD[];

    public constructor(private gestionnaireBD: GestionnaireBDCourse) { }

    public ngAfterViewInit(): void {
      this.obtenirPistes();
    }

    public obtenirPistes(): void {
        this.gestionnaireBD.obtenirPistes().subscribe((piste: PisteBD[]) => this.pistes = piste);
    }

    public choisirCourse(piste: PisteBD): void {
        if (piste !== undefined) {
            this.gestionnaireBD.pisteJeu = piste;
        }
    }
}
