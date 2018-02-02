import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { listeMots } from "../mockObject/mockListWord";
import { Word } from "../mockObject/word";



@Injectable()
export class RequeteDeGrilleService {


  constructor() {
    // this.uneChaine = new Chaine();;
  }

  // getChaine(): Observable<String> {
  //   const obs: Observable<String> = new Observable(observer => {
  //     observer.next(this.uneChaine.chaine);
  //   });
  //   return obs;
  // }

  // setChaine(): void {
  //   this.uneChaine.chaine += "S";
  // }

  getMots(): Observable<Word[]> {
    return of(listeMots);
  }
}
