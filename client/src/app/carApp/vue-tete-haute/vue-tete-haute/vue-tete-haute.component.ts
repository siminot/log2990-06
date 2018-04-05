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
    private tempsCourseMS: string;

    private tempsTours: Array<string>;

    public constructor(private timer: TimerService) {
        this.tempsActuel = 0;
        this.tempsCourseMin = "--";
        this.tempsCourseSec = "--";
        this.tempsCourseMS = "--";
        this.tempsTours = new Array<string>();
    }

    public debuterCourse(): void {
        this.timer.debuterCourse(); // lancer quand la course commence (a retirer)
        this.updateTempsCourse();
    }

    public ngOnInit(): void {}

    private updateTempsCourse(): void {
        setInterval(() => {
            this.tempsActuel = this.timer.obtenirTempsActuel;
            this.tempsCourseMin = this.formaterTempsMinute(this.tempsActuel);
            this.tempsCourseSec = this.formaterTempsSec(this.tempsActuel);
            this.tempsCourseMS = this.formaterTempsMS(this.tempsActuel);
        },          TAUX_REFRESH);
    }

    private formaterTempsMinute(temps: number): string {
        let tempsMin: string = "" + Math.floor(temps / MILSEC_PAR_MIN);
        tempsMin = this.ajouterZero(tempsMin);

        return tempsMin;
    }

    private formaterTempsSec(temps: number): string {
        let tempsSec: string = "" + Math.floor(temps / MILSEC_PAR_SEC) % SEC_PAR_MIN;
        tempsSec = this.ajouterZero(tempsSec);

        return tempsSec;
    }

    private formaterTempsMS(temps: number): string {
        let tempsMS: string = "" + Math.floor((temps % MILSEC_PAR_SEC) / DIVISEUR_POUR_DEUX_DECIMALS);
        tempsMS = this.ajouterZero(tempsMS);

        return tempsMS;
    }

    private ajouterZero(temps: string): string {
        if (temps.length === 1) {
            temps = "0" + temps;
        }

        return temps;
    }
}
