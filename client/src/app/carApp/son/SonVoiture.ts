import { SonAbstrait } from "./SonAbstrait";
import { PositionalAudio, Camera } from "three";

export class SonVoiture extends SonAbstrait {

    private _audio: PositionalAudio;

    protected constructor() {
        super();
        this._audio = new PositionalAudio(this._audioListener);
    }

    public actualiserSon(rpm: number): void {
        // actualiser le son selon la vitesse/rpm
    }

    protected initialisationSon(): void {
        // cheker comment faire un son hehe
    }

    public get obtenirSon(): PositionalAudio {
        return this._audio;
    }

}
