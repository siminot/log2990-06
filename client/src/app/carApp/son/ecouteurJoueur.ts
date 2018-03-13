import { Injectable } from "@angular/core";
import { AudioListener } from "three";

@Injectable()
export class EcouteurJoueur {

  private _audioListener: AudioListener;

  private constructor() {
    this._audioListener = new AudioListener();
  }

  public get audioListener(): AudioListener {
    return this._audioListener;
  }
}
