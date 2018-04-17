import { Injectable } from "@angular/core";
import { TimerService } from "../timer/timer.service";
import { InvalidArgumentError } from "../../exceptions/invalidArgumentError";
import { TempsJoueur } from "./tempsJoueur";
import { DeroulemenCourseService } from "../deroulement-course/deroulemen-course.service";
// import { TempsAffichage } from "../vue-tete-haute/vue-tete-haute/tempsAffichage";

const NBR_JOUEURS: number = 4;

@Injectable()
export class GestionnaireDesTempsService {

    private _tempsJoueur: TempsJoueur;
    private _tempsAIs: Array<TempsJoueur>;

    public constructor(private timer: TimerService) {
        this.initialisation();
        this.souscriptionTourAi();
        this.souscriptionFinCourse();
    }

    private initialisation(): void {
        this._tempsJoueur = new TempsJoueur();
        this._tempsAIs = new Array<TempsJoueur>(NBR_JOUEURS - 1);
        for (let i: number = 0; i < NBR_JOUEURS - 1; i++) {
            this._tempsAIs[i] = new TempsJoueur();
        }
    }

    public set actualiserTempsJoueur(temps: TempsJoueur) {
        this._tempsJoueur = temps;
    }

    public AIxTourComplete(noJoueur: number): void {
        this.verifierIndex(noJoueur);
        this._tempsAIs[noJoueur].definirTempsTour = this.timer.nouveauTour(noJoueur + 1);
    }

    public AIXCourseComplete(noJoueur: number): void {
        this.verifierIndex(noJoueur);
        this._tempsAIs[noJoueur].definirTempsCourse = this.timer.obtenirTempsActuel;
    }

    private verifierIndex(noJoueur: number): void {
        if (noJoueur < 0 || noJoueur >= NBR_JOUEURS) {
            throw new InvalidArgumentError();
        }
    }

    public obtenirTempsDesJoueurs(): Array<TempsJoueur> {
        const tempsFinCourse: Array<TempsJoueur> = new Array<TempsJoueur>();
        tempsFinCourse.push(this._tempsJoueur);
        for (const tempsAi of this._tempsAIs) {
            tempsFinCourse.push(tempsAi);
        }

        return tempsFinCourse;
    }

    private estimerTempsAi(): void {
        for (const tempsAI of this._tempsAIs) {
            let estimeDernierTour: number = this.timer.obtenirTempsActuel;
            for (const tempsTour of tempsAI.tempsTours) {
                if (tempsTour.temps > 0) {
                    estimeDernierTour = tempsTour.temps;
                } else if (tempsTour.temps === 0) {
                    tempsTour.tempsAffichable = estimeDernierTour - 500;
                }
            }
            tempsAI.tempsCourse.tempsAffichable = tempsAI.sommeTempsTours;
            console.log(tempsAI.tempsCourse);
        }
    }

    public get tempsJoueur(): TempsJoueur {
        return this._tempsJoueur;
    }

    private souscriptionTourAi(): void {
        DeroulemenCourseService.souscriptionTourAi()
        .subscribe( (noAi) => {
            this.AIxTourComplete(noAi);
        });
    }

    private souscriptionFinCourse(): void {
        DeroulemenCourseService.souscriptionFinCourse()
        .subscribe( () => {
            this.estimerTempsAi();
        });
    }
}
