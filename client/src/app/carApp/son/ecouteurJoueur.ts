import { Injectable } from "@angular/core";
import { AudioListener } from "three";

@Injectable()
export class EcouteurJoueur {

  private audioListener: AudioListener;

  private constructor() {
    this.audioListener = new AudioListener;
  }

  public getInstance(): AudioListener {
    return this.audioListener;
  }

}
