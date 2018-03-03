import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Mot } from "../objetsTest/mot";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

const REQUETE_DEFAUT: string = "http://localhost:3000/grille/facile";

@Injectable()
export class HttpeReqService {
  private url: string = REQUETE_DEFAUT;
  public difficulte: string;

  public constructor(private http: HttpClient) { }

  public obtenirMots(): Observable<Mot[] > {
    return this.http.get<Mot[]>(this.url);
  }

  public modifierRequete(nouvelleRequete: string): void {
    this.url = nouvelleRequete;
  }
}
