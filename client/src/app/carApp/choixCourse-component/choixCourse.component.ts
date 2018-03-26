import { Component, Inject } from "@angular/core";
import { PisteBD } from "../piste/pisteBD";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { AbstractListePisteComponent } from "../abstract-component/abstract.listePiste.component";

@Component({
    selector: "app-choix-course",
    templateUrl: "./choixCourse.component.html",
    styleUrls: ["./choixCourse.component.css"]
})
export class ChoixCourseComponent extends AbstractListePisteComponent {

    public constructor(@Inject(GestionnaireBDCourse) gestionnaireBD: GestionnaireBDCourse) {
        super(gestionnaireBD);
    }

    public choisirCourse(piste: PisteBD): void {
        if (piste !== undefined) {
            this.gestionnaireBD.pisteJeu = piste;
        }
    }
}
