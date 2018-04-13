import { Injectable } from "@angular/core";

@Injectable()
export class DeroulemenCourseService {

    public static nouveauTourJoueur(): void {
        console.log("nouveauTourJoueur");
    }

    public static nouveauTourAi(): void {
        console.log("nouveauTourAI");
    }

}
