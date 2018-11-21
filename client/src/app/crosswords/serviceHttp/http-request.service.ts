import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Mot } from "../objetsTest/mot";
import { Difficulte } from "../../../../../common/communication/Difficulte";
import { SERVER_URL } from "../../../../../common/communication/Server";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

export const DIFFICULTE_DEFAUT: Difficulte = Difficulte.Facile;
const URL_REQUETE: string = SERVER_URL + "grille/";

@Injectable()
export class ServiceHttp {
  public difficulte: Difficulte;

  public constructor(private http: HttpClient) {
    this.difficulte = DIFFICULTE_DEFAUT;
  }

  public obtenirMots(): Observable<Mot[] > {
    return this.http.get<Mot[]>(this.url);
  }

  private get url(): string {
    return URL_REQUETE + this.difficulte.toString();
  }
}
