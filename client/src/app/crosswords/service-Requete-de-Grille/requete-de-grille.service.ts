import { Injectable } from "@angular/core";
import {listeMot} from "../mockObject/mockListWord";
import { Mockword } from "../mockObject/mockWord";
@Injectable()
export class RequeteDeGrilleService {

  public constructor() { }

  public getMots(): Mockword[] {
  return listeMot;
  }

}
