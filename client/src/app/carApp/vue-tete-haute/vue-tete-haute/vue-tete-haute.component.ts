import { Component, OnInit } from "@angular/core";
import { TimerService } from "../../timer/timer.service";
import { TempsAffichage } from "./tempsAffichage";
import { DeroulemenCourseService } from "../../deroulement-course/deroulemen-course.service";
import { GestionnaireDesTempsService } from "../../GestionnaireDesTemps/gestionnaire-des-temps.service";
import { TempsJoueur } from "../../GestionnaireDesTemps/tempsJoueur";

const TAUX_REFRESH: number = 20;
const NBR_TOURS: number = 3;

@Component({
    selector: "app-vue-tete-haute",
    templateUrl: "./vue-tete-haute.component.html",
    styleUrls: ["./vue-tete-haute.component.css"]
})
export class VueTeteHauteComponent implements OnInit {

    private tempsActuel: number;
    private tempsCourse: TempsAffichage;
    private tempsTours: Array<TempsAffichage>;
    private numTour: number;
    private rafraichissement: NodeJS.Timer;

    public constructor(private timer: TimerService,
                       private gestionTemps: GestionnaireDesTempsService) {
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
        this.timer.debuterCourse(); // lancer quand la course commence (a retirer)
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
                this.courseTermiee();
            }
        }
    }

    private courseTermiee(): void {
        clearInterval(this.rafraichissement);
        this.envoyerTempsJoueur();
    }

    private envoyerTempsJoueur(): void {
        this.gestionTemps.actualiserTempsJoueur = new TempsJoueur();
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
