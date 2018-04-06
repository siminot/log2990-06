import { Component, OnInit } from "@angular/core";
import { ResultatJoueur } from "./resultatJoueur";

@Component({
    selector: "app-fin-course",
    templateUrl: "./fin-course.component.html",
    styleUrls: ["./fin-course.component.css"]
})
export class FinCourseComponent implements OnInit {

    public constructor(public resultatsCourse: ResultatJoueur[]) {
        this.ajouterRangs();
    }

    private ajouterRangs(): void {
        let rang: number = 1;
        for (const resultat of this.resultatsCourse) {
            resultat.rang = rang;
            rang++;
        }
    }

    public ngOnInit(): void {
    }

}
