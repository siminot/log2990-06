import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ResultatJoueur } from "./resultatJoueur";
import { RESULTATS_BIDONS } from "./resultatsBidon";
import { TimerService } from "../timer/timer.service";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";

@Component({
    selector: "app-fin-course",
    templateUrl: "./fin-course.component.html",
    styleUrls: ["./fin-course.component.css"]
})

export class FinCourseComponent {

    public resultatsCourse: ResultatJoueur[];
    public nomPiste: string;

    public constructor(private router: Router,
                       private gestionnaireBD: GestionnaireBDCourse,
                       private serviceTemps: TimerService) {

        this.nomPiste = gestionnaireBD.pisteJeu.nom;
        this.resultatsCourse = RESULTATS_BIDONS;
        this.classerLesTemps();
        this.ajouterPositions();
    }

    private creerResultatJoueurs(): void {
        const resultats: ResultatJoueur[] = [];
        
    }

    private classerLesTemps(): void {
        this.resultatsCourse.sort((a: ResultatJoueur, b: ResultatJoueur) =>
            a.tempsCourse.temps - b.tempsCourse.temps);
    }

    private ajouterPositions(): void {
        let position: number = 1;
        for (const resultat of this.resultatsCourse) {
            resultat.position = position;
            position++;
        }
    }

    public compare(): void {
        this.router.navigate(["/tableauMeilleursTemps"]);
    }

}
