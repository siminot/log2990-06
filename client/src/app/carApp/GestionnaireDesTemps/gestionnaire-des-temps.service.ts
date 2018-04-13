import { Injectable } from "@angular/core";
import { TimerService } from "../timer/timer.service";
import { InvalidArgumentError } from "../../exceptions/invalidArgumentError";
import { TempsJoueur } from "./tempsJoueur";

const NBR_JOUEURS: number = 4;

@Injectable()
export class GestionnaireDesTempsService {

    private tempsJoueur: TempsJoueur;
    private tempsAIs: Array<TempsJoueur>;

    public constructor(private timer: TimerService) {
        this.initialisation();
    }

    private initialisation(): void {
        this.tempsJoueur = new TempsJoueur();
        this.tempsAIs = new Array<TempsJoueur>(NBR_JOUEURS - 1);
        for (let i: number = 0; i < NBR_JOUEURS - 1; i++) {
            this.tempsAIs[i] = new TempsJoueur();
        }
    }

    public set actualiserTempsJoueur(temps: TempsJoueur) {
        this.tempsJoueur = temps;
    }

    public AIxTourComplete(noJoueur: number): void {
        this.verifierIndex(noJoueur);
        this.tempsAIs[noJoueur].definirTempsTour = this.timer.nouveauTour(noJoueur);
    }

    public AIXCourseComplete(noJoueur: number): void {
        this.verifierIndex(noJoueur);
        this.tempsAIs[noJoueur].definirTempsCourse = this.timer.obtenirTempsActuel;
    }

    private verifierIndex(noJoueur: number): void {
        if (noJoueur < 0 || noJoueur >= NBR_JOUEURS - 1) {
            throw new InvalidArgumentError();
        }
    }

    public get obtenirTempsDesJoueurs(): Array<TempsJoueur> {
        const tempsFinCourse: Array<TempsJoueur> = new Array<TempsJoueur>();
        tempsFinCourse.push(this.tempsJoueur);
        for (const tempsAi of this.tempsAIs) {
            tempsFinCourse.push(tempsAi);
        }

        return tempsFinCourse;
    }
}
