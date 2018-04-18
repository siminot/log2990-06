import { Injectable } from "@angular/core";
import { PisteBD } from "../piste/IPisteBD";
import { HttpClient } from "@angular/common/http";
import { Point } from "../elementsGeometrie/point";
import { Observable } from "rxjs/Observable";
import { IDefinitionPoint } from "../../../../../common/communication/IDefinitionPoint";

export const PISTES_URL: string = "http://localhost:3000/apipistes/";
const URL_SUPPRIMER_PISTE: string = PISTES_URL + "supprimer/";
const URL_AJOUTER_PISTE: string = PISTES_URL + "ajouter/";
const URL_MODIFIER_PISTE: string = PISTES_URL + "modifier/";
const URL_INC_NB_FOIS_JOUE_PISTE: string = PISTES_URL + "incrementer/";

@Injectable()
export class GestionnaireBDCourse {

    public pisteEdition: PisteBD;
    public pisteJeu: PisteBD;

    public constructor(private http: HttpClient) {
        this.pisteEdition = null;
        this.pisteJeu = null;
  }

    public get pointsEdition(): Point[] {
        return this.obtenirPoints(this.pisteEdition);
    }

    public get pointsJeu(): Point[] {
        return this.obtenirPoints(this.pisteJeu);
    }

    private obtenirPoints(piste: PisteBD): Point[] {
        return piste !== null
            ? this.creationPointsSelonInterface(piste.points)
            : [];
    }

    private creationPointsSelonInterface(pointsdefinition: IDefinitionPoint[]): Point[] {
        const points: Point[] = [];
        for (const point of pointsdefinition) {
            points.push(new Point(point.x, point.y));
        }

        return points;
    }

    public obtenirPistes(): Observable<PisteBD[]> {
        return this.http.get<PisteBD[]>(PISTES_URL);
    }

    public obtenirUnePiste(identifiant: string): Observable<PisteBD> {
       return this.http.get<PisteBD>(PISTES_URL + identifiant);
    }

    public async supprimerPiste(piste: PisteBD): Promise<Object> {
        return this.http.delete(URL_SUPPRIMER_PISTE + piste._id).toPromise();
    }

    public async creerNouvellePiste(piste: PisteBD): Promise<Object> {
        return this.http.post(URL_AJOUTER_PISTE, piste).toPromise();
    }

    public async mettreAJourPiste(piste: PisteBD): Promise<Object> {
        return this.http.patch(URL_MODIFIER_PISTE + piste._id, piste).toPromise();
    }

    public async incrementerNbFoisJouePiste(piste: PisteBD): Promise<Object> {
        return this.http.patch(URL_INC_NB_FOIS_JOUE_PISTE + piste._id, piste).toPromise();
    }
}
