import { Injectable } from "@angular/core";
import { listeMots } from "../mockObject/mockListWord";
import { Mockword } from "../mockObject/mockWord";

@Injectable()
export class RequeteDeGrilleService {

  public constructor() { }

  public getMots(): Mockword[] {
    return listeMots;
  }



}
