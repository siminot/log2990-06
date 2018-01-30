import { Injectable } from "@angular/core";
import { of } from 'rxjs/observable/of';

import { listeMots } from "../mockObject/mockListWord";
import { Mockword } from "../mockObject/mockWord";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RequeteDeGrilleService {

  public constructor() { }

  public getMots(): Observable<Mockword[]> {
    return of(listeMots);
  }
}
