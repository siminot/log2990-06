import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { listeMots } from "../mockObject/mockListWord";
import { Word } from "../mockObject/word";
import { setTimeout } from "timers";


@Injectable()
export class RequeteDeGrilleService {
  public uneChaine: String;

  constructor() {
    this.uneChaine = "POP";
  }

  init():void {

  }

  getChaine(): Observable<String> {
    const obs: Observable<String> = new Observable(observer => {
      observer.next(this.uneChaine);
    });
    return obs;
  }

  setChaine(chaine: String): void {
    this.uneChaine = chaine;
  }


  getMots(): Observable<Word[]> {
    return of(listeMots);
  }
}
