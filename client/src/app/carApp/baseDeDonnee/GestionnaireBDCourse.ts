import { Injectable } from "@angular/core";
import { PisteBD } from "../piste/pisteBD";
import { HttpClient } from "@angular/common/http";
import { Point } from "../elementsGeometrie/point";

export const PISTES_URL: string = "http://localhost:3000/apipistes/";
const URL_SUPPRIMER_PISTE: string = PISTES_URL + "supprimer/";
const URL_AJOUTER_PISTE: string = PISTES_URL + "ajouter/";
const URL_MODIFIER_PISTE: string = PISTES_URL + "modifier/";

@Injectable()
export class GestionnaireBDCourse {

    public pistes: PisteBD[];
    public pisteEdition: PisteBD;

    public get pointsEdition(): Point[] {
        if (this.pisteEdition === null) {
            return [];
        } else {
            const piste: Point[] = [];
            for (const point of this.pisteEdition.points) {
                piste.push(new Point(point.x, point.y));
            }

            return piste;
        }
    }

    public constructor(private http: HttpClient) {
        this.pisteEdition = null;
    }

    public obtenirPistes(): PisteBD[] {
        this.http.get<PisteBD[]>(PISTES_URL)
            .subscribe((pistes) => this.pistes = pistes);

        return this.pistes;
    }

    public supprimerPiste(piste: PisteBD): void {
        this.http.delete(URL_SUPPRIMER_PISTE + piste._id).subscribe();
    }

    public creerNouvellePiste(piste: PisteBD): void {
        this.http.post(URL_AJOUTER_PISTE, piste).subscribe();
    }

    public mettreAJourPiste(points: Point[]): void {
        this.pisteEdition.points = points;
        this.http.patch(URL_MODIFIER_PISTE + this.pisteEdition._id, this.pisteEdition.points).subscribe();
    }
}
