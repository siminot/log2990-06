import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Mot } from "../objetsTest/mot";
import { Difficulte } from "../../../../../common/communication/IConfigurationPartie";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

export const DIFFICULTE_DEFAUT: Difficulte = Difficulte.Facile;
const URL_REQUETE: string = "http://localhost:3000/grille/";

@Injectable()
export class HttpeReqService {
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
