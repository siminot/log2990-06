import { Subject } from "rxjs/Subject";

const sujetJoueur: Subject<void> = new Subject();

export class DeroulemenCourseService {

    public static nouveauTourJoueur(): void {
        sujetJoueur.next();
        console.log("TOUR_JOUEUR");
    }

    public static nouveauTourAi(): void {
        console.log("nouveauTourAI");
    }

    public static testonsDesChoses(): Subject<void> {
        return sujetJoueur;
    }

}
