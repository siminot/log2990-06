import { SonAbstrait, LISTENER } from "./SonAbstrait";
import { Audio } from "three";

export class SonDepart extends SonAbstrait {

    private _audio: Audio;

    public constructor() {
        super();
        this._audio = new Audio(LISTENER);
        this.initialisationSon();
    }

    protected initialisationSon(): void {
        this._audioLoader.load("./../../../assets/sons/raceStart.wav",
                               (buffer: THREE.AudioBuffer) => {
            this._audio.setBuffer(buffer);
        },                     null, null);
    }

    public get obtenirSon(): Audio {
        return this._audio;
    }

    public jouerSon(): void {
        this._audio.play();
    }

}
