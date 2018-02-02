import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { listeMots } from "../mockObject/mockListWord";
import { Mockword } from "../mockObject/mockWord";


@Injectable()
export class RequeteDeGrilleService {
  

  constructor() { }

  getMots(): Observable<Mockword[]> {
    return of(listeMots);
  }
}
