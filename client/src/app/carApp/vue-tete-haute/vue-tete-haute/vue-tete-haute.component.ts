import { Component, OnInit } from "@angular/core";
import { TimerService } from "../../timer/timer.service";

const MILSEC_PAR_MIN: number = 60000;
const MILSEC_PAR_SEC: number = 1000;
const SEC_PAR_MIN: number = 60;
const TAUX_REFRESH: number = 20;
const DIVISEUR_POUR_DEUX_DECIMALS: number = 10;

@Component({
    selector: "app-vue-tete-haute",
    templateUrl: "./vue-tete-haute.component.html",
    styleUrls: ["./vue-tete-haute.component.css"]
})
export class VueTeteHauteComponent implements OnInit {

    private tempsActuel: number;
    private tempsCourseMin: string;
    private tempsCourseSec: string;
    private tempsCourseMil: string;

    public constructor(private timer: TimerService) {
        this.tempsActuel = 0;
        this.tempsCourseMin = "00";
        this.tempsCourseSec = "00";
        this.tempsCourseMil = "00";
    }

    public ngOnInit(): void {
        this.timer.debuterCourse(); // lancer quand la course commence (a retirer)
        this.updateTempsCourse();
    }

    private updateTempsCourse(): void {
        setInterval(() => {
            this.tempsActuel = this.timer.obtenirTempsActuel;
            this.formaterTempsMinute();
            this.formaterTempsSec();
            this.formaterTempsMilSec();
        },          TAUX_REFRESH);
    }

    private formaterTempsMinute(): void {
        this.tempsCourseMin = "" + Math.floor(this.tempsActuel / MILSEC_PAR_MIN);
        this.tempsCourseMin = this.ajouterZero(this.tempsCourseMin);
    }

    private formaterTempsSec(): void {
        this.tempsCourseSec = "" + Math.floor(this.tempsActuel / MILSEC_PAR_SEC) % SEC_PAR_MIN;
        this.tempsCourseSec = this.ajouterZero(this.tempsCourseSec);
    }

    private formaterTempsMilSec(): void {
        this.tempsCourseMil = "" + Math.floor((this.tempsActuel % MILSEC_PAR_SEC) / DIVISEUR_POUR_DEUX_DECIMALS);
        this.tempsCourseMil = this.ajouterZero(this.tempsCourseMil);
    }

    private ajouterZero(temps: string): string {
        if (temps.length < 2) {
            temps = "0" + temps;
        }

        return temps;
    }
}
