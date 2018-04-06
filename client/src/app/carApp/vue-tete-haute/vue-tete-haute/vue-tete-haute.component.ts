import { Component, OnInit } from "@angular/core";
import { TimerService } from "../../timer/timer.service";
import { TempsAffichage } from "./tempsAffichage";

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

    public constructor(private timer: TimerService) {
        this.tempsActuel = 0;
        this.numTour = 1;
        this.tempsCourse = new TempsAffichage();
        this.tempsTours = new Array<TempsAffichage>();
        for (let i: number = 0; i < NBR_TOURS; i++) {
            this.tempsTours.push(new TempsAffichage);
        }
    }

    public debuterCourse(): void {
        this.timer.debuterCourse(); // lancer quand la course commence (a retirer)
        this.updateTempsCourse();
        this.foo();
    }

    public ngOnInit(): void {
        this.debuterCourse();
    }

    private updateTempsCourse(): void {
        setInterval(() => {
            this.tempsActuel = this.timer.obtenirTempsActuel;
            this.tempsCourse.tempsAffichable = this.tempsActuel;
            if ( this.numTour <= NBR_TOURS) {
                this.tempsTours[this.numTour - 1].tempsAffichable = this.timer.obtenirTempsTour;
            }
        },          TAUX_REFRESH);
    }

    private nouveauTour(): void {
        if (this.numTour <= NBR_TOURS) {
            this.tempsTours[this.numTour++ - 1].tempsAffichable = this.timer.nouveauTour;
        }
    }

    private foo(): void { // fonction seulement pour essayer des  choses
        setInterval(() => {
            this.nouveauTour();
        },         5000);
    }
}
