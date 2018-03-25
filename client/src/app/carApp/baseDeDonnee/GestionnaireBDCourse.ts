import { Injectable } from "@angular/core";
import { PisteBD } from "../piste/pisteBD";
import { HttpClient } from "@angular/common/http";
import { Point } from "../elementsGeometrie/point";

export const PISTES_URL: string = "http://localhost:3000/apipistes";
const SUPRIMER_PISTES_URL: string = "http://localhost:3000/apipistes/supprimer/";

@Injectable()
export class GestionnaireBDCourse {

    public pistes: PisteBD[];
    public pisteEdition: PisteBD;

    public get pointsEdition(): Point[] {
        const piste: Point[] = [];

        for (const point of this.pisteEdition.points) {
            piste.push(new Point(point.x, point.y));
        }

        return piste;
    }

    public constructor(private http: HttpClient) { }

    public obtenirPistes(): PisteBD[] {
        this.http.get<PisteBD[]>(PISTES_URL)
            .subscribe((pistes) => this.pistes = pistes);

        return this.pistes;
    }

    public supprimerPiste(piste: PisteBD): void {
        this.http.delete(SUPRIMER_PISTES_URL + piste.nom);
    }
}
