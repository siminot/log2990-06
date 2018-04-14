import { Subject } from "rxjs/Subject";

const sujetJoueur: Subject<void> = new Subject<void>();
const sujetAi: Subject<number> = new Subject<number>();
const sujetDebutCourse: Subject<void> = new Subject<void>();
const sujetFinCourse: Subject<void> = new Subject<void>();

export class DeroulemenCourseService {

    public static nouveauTourJoueur(): void {
        sujetJoueur.next();
    }

    public static nouveauTourAi(noAi: number): void {
        sujetAi.next(noAi);
    }

    public static debutCourse(): void {
        sujetDebutCourse.next();
    }

    public static finCourse(): void {
        sujetFinCourse.next();
    }

    public static souscriptionTourJoueur(): Subject<void> {
        return sujetJoueur;
    }

    public static souscriptionTourAi(): Subject<number> {
        return sujetAi;
    }

    public static souscriptionDebutCourse(): Subject<void> {
        return sujetDebutCourse;
    }

    public static souscriptionFinCourse(): Subject<void> {
        return sujetFinCourse;
    }

}
