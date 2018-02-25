import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class InfojoueurService {
  // Déclaration du sujet et de l'observable ici.
  private _pointage: number;
  private _pointageSujet: Subject<number>;
  private _pointageObservable$: Observable<number>;

  public constructor() {
    this._pointage = 0;
    this._pointageSujet = new Subject<number>();
    this._pointageObservable$ = this._pointageSujet.asObservable();
  }

  public incrementationPointage(pointage: number): void {
    this._pointage += pointage;
    this._pointageSujet.next(this._pointage);
  }

  public serviceReceptionPointage(): Observable<number> {
    return this._pointageObservable$;
  }

  public getPointage(): number {
    return this._pointage;
  }
}
