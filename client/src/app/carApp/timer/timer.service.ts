import { Injectable } from "@angular/core";

@Injectable()
export class TimerService {

    private tempsDebutCourse: number;
    private tempsDebutTour: number;
    private tempsActuel: number;
    private tempsTour: number;

    public constructor() {
        this.tempsDebutCourse = 0;
        this.tempsDebutTour = 0;
        this.tempsActuel = 0;
        this.tempsTour = 0;
    }

    public debuterCourse(): void {
        this.tempsDebutCourse = new Date().getTime();
        this.tempsDebutTour = new Date().getTime();
        this.partirTimer();
    }

    private partirTimer(): void {
        setInterval(() => {
            this.tempsActuel = new Date().getTime() - this.tempsDebutCourse;
            this.tempsTour = new Date().getTime() - this.tempsDebutTour;
        },          1);
    }

    private actualisationTempsTour(): void {
        this.tempsDebutTour = new Date().getTime();
        this.tempsTour = 0;
    }

    public get nouveauTour(): number {
        const tempsDernierTour: number = this.tempsTour;
        this.actualisationTempsTour();

        return tempsDernierTour;
    }

    public get obtenirTempsActuel(): number {
        return this.tempsActuel;
    }

    public get obtenirTempsTour(): number {
        return this.tempsTour;
    }

}
