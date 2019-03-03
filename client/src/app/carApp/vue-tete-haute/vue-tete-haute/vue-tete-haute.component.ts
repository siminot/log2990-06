import { Component, OnInit } from "@angular/core";
import { TimerService } from "../../timer/timer.service";
import { TempsAffichage } from "./tempsAffichage";
import { DeroulemenCourseService } from "../../deroulement-course/deroulemen-course.service";
import { GestionnaireDesTempsService } from "../../GestionnaireDesTemps/gestionnaire-des-temps.service";
import { TempsJoueur } from "../../GestionnaireDesTemps/tempsJoueur";
import { Router } from "@angular/router";

const TAUX_REFRESH: number = 20;
const NBR_TOURS: number = 3;

@Component({
    selector: "app-vue-tete-haute",
    templateUrl: "./vue-tete-haute.component.html",
    styleUrls: ["./vue-tete-haute.component.css"]
})
export class VueTeteHauteComponent implements OnInit {
    public tempsCourse: TempsAffichage;
    public tempsTours: Array<TempsAffichage>;
    public numTour: number;
    private tempsActuel: number;
    private rafraichissement: NodeJS.Timer;

    public constructor(private timer: TimerService,
                       private gestionTemps: GestionnaireDesTempsService,
                       private router: Router) {
        this.tempsActuel = 0;
        this.numTour = 1;
        this.initialisationDesTemps();
        this.souscriptionTour();
        this.souscriptionDebutCourse();
    }

    private initialisationDesTemps(): void {
        this.tempsCourse = new TempsAffichage();
        this.tempsTours = new Array<TempsAffichage>();
        for (let i: number = 0; i < NBR_TOURS; i++) {
            this.tempsTours.push(new TempsAffichage);
        }
    }

    public debuterCourse(): void {
        this.timer.debuterCourse();
        this.updateTempsCourse();
    }

    public ngOnInit(): void {}

    private updateTempsCourse(): void {
        this.rafraichissement = setInterval(() => {
            this.tempsActuel = this.timer.obtenirTempsActuel;
            this.tempsCourse.tempsAffichable = this.tempsActuel;
            if ( this.numTour <= NBR_TOURS) {
                this.tempsTours[this.numTour - 1].tempsAffichable = this.timer.obtenirTempsTourJoueur;
            }
        },                                  TAUX_REFRESH);
    }

    public nouveauTour(noJoueur: number): void {
        if (this.numTour <= NBR_TOURS) {
            this.tempsTours[this.numTour++ - 1].tempsAffichable = this.timer.nouveauTour(noJoueur);
            if (this.numTour > NBR_TOURS) {
                this.courseTerminee();
            }
        }
    }

    private courseTerminee(): void {
        clearInterval(this.rafraichissement);
        this.envoyerTempsJoueur();
        DeroulemenCourseService.finCourse();
        this.router.navigate(["/finCourse"]);
    }

    private envoyerTempsJoueur(): void {
        this.gestionTemps.actualiserTempsJoueur = this.creerTempsJoueur();
    }

    private creerTempsJoueur(): TempsJoueur {
        const leTempsDuJoueur: TempsJoueur = new TempsJoueur;
        leTempsDuJoueur.definirAI = false;
        leTempsDuJoueur.definirTempsCourse = this.tempsCourse.temps;
        for (let i: number = 0; i < NBR_TOURS; i++) {
            leTempsDuJoueur.definirTempsTour = this.tempsTours[i].temps;
        }

        return leTempsDuJoueur;
    }

    private souscriptionDebutCourse(): void {
        DeroulemenCourseService.souscriptionDebutCourse()
        .subscribe( () => {
            this.debuterCourse();
        });
    }

    private souscriptionTour(): void {
        DeroulemenCourseService.souscriptionTourJoueur()
        .subscribe( () => {
            this.nouveauTour(0);
        });
    }

}
