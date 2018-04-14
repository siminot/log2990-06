import { Subject } from "rxjs/Subject";

const sujetJoueur: Subject<void> = new Subject<void>();
const sujetAi: Subject<number> = new Subject<number>();

export class DeroulemenCourseService {

    public static nouveauTourJoueur(): void {
        sujetJoueur.next();
    }

    public static nouveauTourAi(noAi: number): void {
        sujetAi.next(noAi);
    }

    public static souscriptionTourJoueur(): Subject<void> {
        return sujetJoueur;
    }

    public static SouscriptionTourAi(): Subject<number> {
        return sujetAi;
    }

}
