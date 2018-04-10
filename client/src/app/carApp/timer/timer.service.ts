import { Injectable } from "@angular/core";

const NBR_JOUEURS: number = 4;

@Injectable()
export class TimerService {

    private tempsDebutCourse: number;
    private tempsDebutTour: Array<number>;
    private tempsActuel: number;
    private tempsTour: Array<number>;

    public constructor() {
        this.tempsDebutCourse = 0;
        this.tempsDebutTour = new Array<number>(NBR_JOUEURS).fill(0);
        this.tempsActuel = 0;
        this.tempsTour = new Array<number>(NBR_JOUEURS).fill(0);
    }

    public debuterCourse(): void {
        const tempsDebut: number = new Date().getTime();
        this.tempsDebutCourse = tempsDebut;
        this.tempsDebutTour.fill(tempsDebut);
        this.partirTimer();
    }

    private partirTimer(): void {
        setInterval(() => {
            const temps: number = new Date().getTime();
            this.tempsActuel = temps - this.tempsDebutCourse;
            for (let i: number = 0; i < NBR_JOUEURS; i++) {
                this.tempsTour[i] = temps - this.tempsDebutTour[i];
            }
        },          1);
    }

    private actualisationTempsTour(noJoueur: number): void {
        this.tempsDebutTour[noJoueur] = new Date().getTime();
        this.tempsTour[noJoueur] = 0;
    }

    public nouveauTour(noJoueur: number): number {
        const tempsDernierTour: number = this.tempsTour[noJoueur];
        this.actualisationTempsTour(noJoueur);

        return tempsDernierTour;
    }

    public get obtenirTempsActuel(): number {
        return this.tempsActuel;
    }

    public get obtenirTempsTourJoueur(): number {
        return this.tempsTour[0];
    }

}
