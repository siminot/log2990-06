import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class InfojoueurService {

  // Déclaration du sujet et de l'observable ici.
  private pointageSujet: Subject<number>;

  private pointageObservable$: Observable<number>;

  public constructor() {
    this.pointageSujet = new Subject<number>();
    this.pointageObservable$ = new Observable<number>();
  }

}
