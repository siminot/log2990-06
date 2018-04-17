import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ResultatJoueur } from "./resultatJoueur";
import { RESULTATS_BIDONS } from "./resultatsBidon";

@Component({
    selector: "app-fin-course",
    templateUrl: "./fin-course.component.html",
    styleUrls: ["./fin-course.component.css"]
})

export class FinCourseComponent {

    public resultatsCourse: ResultatJoueur[];

    public constructor(private router: Router) {
        this.resultatsCourse = RESULTATS_BIDONS;
        this.classerLesTemps();
        this.ajouterRangs();
    }

    private classerLesTemps(): void {
        this.resultatsCourse.sort((a: ResultatJoueur, b: ResultatJoueur) =>
            a.tempsCourse.temps - b.tempsCourse.temps);
    }

    private ajouterRangs(): void {
        let rang: number = 1;
        for (const resultat of this.resultatsCourse) {
            resultat.rang = rang;
            rang++;
        }
    }

    public compare(): void {
        this.router.navigate(["/tableauMeilleursTemps"]);
    }

}
