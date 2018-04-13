import { IObjetEnMouvement } from "../voiture/IObjetEnMouvement";
import { ControleurJoueur } from "./controleurJoueur";
import { DeroulemenCourseService } from "../deroulement-course/deroulemen-course.service";

export class ControleurVoiture extends ControleurJoueur implements IObjetEnMouvement {

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
            DeroulemenCourseService.nouveauTourAi();
        }
        this.pointDestination = this.pointSuivant;
    }
}
