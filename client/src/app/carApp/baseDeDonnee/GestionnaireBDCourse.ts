import { Injectable } from "@angular/core";
import { PisteBD } from "../piste/pisteBD";
import { PISTES } from "../piste/pisteTest";
import { HttpClient } from "@angular/common/http";

const PISTES_URL: string = "http://localhost:3000/apipistes";
const SUPRIMER_PISTES_URL: string = "http://localhost:3000/apipistes/supprimer/";

@Injectable()
export class GestionnaireBDCourse {

    public pistes: PisteBD[];

    public constructor(private http: HttpClient) { }

    public static get pistes(): PisteBD[] {
        return PISTES;
    }

    public obtenirPistes(): PisteBD[] {
        this.http.get<PisteBD[]>(PISTES_URL)
            .subscribe((pistes) => this.pistes = pistes);

        return this.pistes;
    }

    public editerPiste(piste: PisteBD): void {

    }

    public supprimerPiste(piste: PisteBD): void {
        this.http.delete(SUPRIMER_PISTES_URL + piste.nom);
    }

}
