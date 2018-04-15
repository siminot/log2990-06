import { IObjetEnMouvement } from "../voiture/IObjetEnMouvement";
import { ControleurJoueur } from "./controleurJoueur";
import { DeroulemenCourseService } from "../deroulement-course/deroulemen-course.service";
import { Voiture } from "../voiture/voiture";
import { Point } from "../elementsGeometrie/point";

export class ControleurVoiture extends ControleurJoueur implements IObjetEnMouvement {

    private noAi: number;

    public constructor(protected voiture: Voiture,
                       protected piste: Point[], noAi: number) {
        super(voiture, piste);
        this.noAi = noAi;
    }

    public miseAJour(temps: number): void {
        if (this.pointDestination !== null) {
            this.voiture.miseAJour(temps);
            this.miseAJourPoint();
            this.ajustementDirection();
            this.ajustementVitesse();
        }
    }

    protected passerProchainPoint(): void {
        if (this.pointDestination === this.piste[this.piste.length - 1]) {
            DeroulemenCourseService.nouveauTourAi(this.noAi);
        }
        this.pointDestination = this.pointSuivant;
    }
}
