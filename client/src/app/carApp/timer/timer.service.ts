import { Injectable } from "@angular/core";

@Injectable()
export class TimerService {

    private tempsDebutCourse: number;
    private tempsActuel: number;
    private tempsDernierTour: number;

    public constructor() {
        this.tempsDebutCourse = 0;
        this.tempsActuel = 0;
    }

    public debuterCourse(): void {
        this.tempsDebutCourse = new Date().getTime();
        this.partirTimer();
    }

    private partirTimer(): void {
        setInterval(() => {
            this.tempsActuel = new Date().getTime() - this.tempsDebutCourse;
        },          1);
    }

    private actualisationTempsTour(): void {
        this.tempsDernierTour = this.tempsDernierTour - this.tempsActuel;
    }

    public get obtenirTempsDernierTour(): number {
        this.actualisationTempsTour();

        return this.tempsDernierTour;
    }

    public get obtenirTempsActuel(): number {
        return this.tempsActuel;
    }

}
