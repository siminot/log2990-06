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

    public peutComparer: boolean;
    public resultatsCourse: ResultatJoueur[];

    public constructor(private router: Router) {
        this.resultatsCourse = RESULTATS_BIDONS;
        this.classerLesTemps();
        this.ajouterRangs();
        this.peutComparer = this.peutComparerAvecLesMeilleursTemps();
    }

    private classerLesTemps(): void {
        this.resultatsCourse.sort((a: ResultatJoueur, b: ResultatJoueur) =>
            a.tempsCourse.obtenirTemps - b.tempsCourse.obtenirTemps);
    }

    private ajouterRangs(): void {
        let rang: number = 1;
        for (const resultat of this.resultatsCourse) {
            resultat.rang = rang;
            rang++;
        }
    }

    private peutComparerAvecLesMeilleursTemps(): boolean {
        return this.resultatsCourse[0].joueurEstHumain;
    }

    public compare(): void {
        this.router.navigate(["/tableauMeilleursTemps"]);
    }

}
