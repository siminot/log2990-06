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
    public pisteJeu: PisteBD;

    public get pointsEdition(): Point[] {
        return this.obtenirPoints(this.pisteEdition);
    }

    public get pointsJeu(): Point[] {
        return this.obtenirPoints(this.pisteJeu);
    }

    private obtenirPoints(piste: PisteBD): Point[] {
        if (piste === null) {
            return [];
        } else {
            const points: Point[] = [];
            for (const point of piste.points) {
                points.push(new Point(point.x, point.y));
            }

            return points;
        }
    }
    public constructor(private http: HttpClient) {
        this.pisteEdition = null;
        this.pisteJeu = null;
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

    public mettreAJourPiste(piste: PisteBD): void {
        this.http.patch(URL_MODIFIER_PISTE + this.pisteEdition._id, piste).subscribe();
    }
}
