import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class InfojoueurService {
  // Déclaration du sujet et de l'observable ici.
  private _nbMotsDecouverts: number;
  private _nbMotsDecouvSujet: Subject<number>;
  private _nbMotsDecouvObservable$: Observable<number>;

  public constructor() {
    this._nbMotsDecouverts = 0;
    this._nbMotsDecouvSujet = new Subject<number>();
    this._nbMotsDecouvObservable$ = this._nbMotsDecouvSujet.asObservable();
  }

  public incrementationNbMotDecouv(incrMotDecouvert: number): void {
    this._nbMotsDecouverts += incrMotDecouvert;
    this._nbMotsDecouvSujet.next(this._nbMotsDecouverts);
  }

  public serviceReceptionPointage(): Observable<number> {
    return this._nbMotsDecouvObservable$;
  }

  public getPointage(): number {
    return this._nbMotsDecouverts;
  }
}
