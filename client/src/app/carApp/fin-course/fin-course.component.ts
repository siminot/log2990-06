import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ResultatJoueur } from "./resultatJoueur";
import { GestionnaireDesTempsService } from "../GestionnaireDesTemps/gestionnaire-des-temps.service";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { TempsJoueur } from "../GestionnaireDesTemps/tempsJoueur";

const JOUEUR: string = "Joeur";
const AI: string = "AI";

@Component({
    selector: "app-fin-course",
    templateUrl: "./fin-course.component.html",
    styleUrls: ["./fin-course.component.css"]
})
export class FinCourseComponent implements OnInit {

    public resultatsCourse: ResultatJoueur[];
    public nomPiste: string;

    public constructor(private router: Router,
                       private gestionnaireBD: GestionnaireBDCourse,
                       private gestionnaireTemps: GestionnaireDesTempsService) {}

    public ngOnInit(): void {
        this.nomPiste = this.gestionnaireBD.pisteJeu.nom;
        this.creerResultatJoueurs();
        this.classerLesTemps();
        this.ajouterPositions();
    }

    private creerResultatJoueurs(): void {
        const tempsDesJoueurs: TempsJoueur[] = this.gestionnaireTemps.obtenirTempsDesJoueurs();
        this.resultatsCourse[0] = new ResultatJoueur(JOUEUR, tempsDesJoueurs[0]);
        for (let i: number = 1; i < tempsDesJoueurs.length; i++ ) {
            this.resultatsCourse.push(new ResultatJoueur(AI + " " + i , tempsDesJoueurs[i]));
        }
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
