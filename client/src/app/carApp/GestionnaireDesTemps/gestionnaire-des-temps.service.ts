import { Injectable } from "@angular/core";
import { TimerService } from "../timer/timer.service";
import { TempsAffichage } from "../vue-tete-haute/vue-tete-haute/tempsAffichage";
import { InvalidArgumentError } from "../../exceptions/invalidArgumentError";

const NBR_JOUEURS: number = 4;

@Injectable()
export class GestionnaireDesTempsService {

    private tempsJoueur: TempsAffichage;
    private tempsAIs: Array<TempsAffichage>;

    public constructor(private timer: TimerService) {
        this.initialisation();
    }

    private initialisation(): void {
        this.tempsJoueur = new TempsAffichage();
        this.tempsAIs = new Array<TempsAffichage>(NBR_JOUEURS - 1);
        for (let i: number = 0; i < NBR_JOUEURS - 1; i++) {
            this.tempsAIs[i] = new TempsAffichage();
        }
    }

    public set actualiserTempsJoueur(temps: TempsAffichage) {
        this.tempsJoueur = temps;
    }

    public AIxTourComplete(noJoueur: number): void {
        this.verifierIndex(noJoueur);
        this.timer.nouveauTour(noJoueur); // juste pour pas avoir de probleme de compil...
    }

    public AIXCourseComplete(noJoueur: number): void {
        this.verifierIndex(noJoueur);
        this.tempsAIs[noJoueur].tempsAffichable = this.timer.obtenirTempsActuel;
    }

    private verifierIndex(noJoueur: number): void {
        if (noJoueur < 0 || noJoueur >= NBR_JOUEURS - 1) {
            throw new InvalidArgumentError();
        }
    }

    public get obtenirTempsDesJoueurs(): Array<TempsAffichage> {
        const tempsFinCourse: Array<TempsAffichage> = new Array<TempsAffichage>();
        tempsFinCourse.push(this.tempsJoueur);
        for (const tempsAi of this.tempsAIs) {
            tempsFinCourse.push(tempsAi);
        }

        return tempsFinCourse;
    }
}
