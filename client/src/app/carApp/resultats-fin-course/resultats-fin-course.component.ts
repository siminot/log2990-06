import { Component, OnInit } from "@angular/core";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { PisteBD } from "../piste/IPisteBD";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: "app-resultats-fin-course",
    templateUrl: "./resultats-fin-course.component.html",
    styleUrls: ["./resultats-fin-course.component.css"]
})

export class ResultatsFinCourseComponent implements OnInit {
    public pistes: PisteBD[];
    public abonnementPistes: Subscription;

    public pisteCourante: PisteBD;
    public abonnementPisteCourante: Subscription;

    public unePiste: PisteBD = { _id: "1a", nom: "Une piste", description: "Une description",
                                 points: null, infos: "Hello",
                                 tempsTours: [{ nom: "Ken Block", min: 1, sec: 0, milliSec: 0}]};

    public constructor(private gestionnaireBD: GestionnaireBDCourse) {

    }

    public ngOnInit(): void {
        this.abonnementPistes = this.gestionnaireBD.obtenirPistes()
            .subscribe((pistes: PisteBD[]) => this.pistes = pistes);

        console.log(this.gestionnaireBD.pisteJeu);
        if (this.gestionnaireBD.pisteJeu === null) {
            this.gestionnaireBD.pisteJeu = this.unePiste;
        }

        this.pisteCourante = this.gestionnaireBD.pisteJeu;
        console.log(this.pisteCourante);
    }

}
