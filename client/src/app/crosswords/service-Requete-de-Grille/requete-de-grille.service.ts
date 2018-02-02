import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { listeMots } from "../mockObject/mockListWord";
import { Word } from "../mockObject/word";


@Injectable()
export class RequeteDeGrilleService {
  

  constructor() { }

  getMots(): Observable<Word[]> {
    return of(listeMots);
  }
}
