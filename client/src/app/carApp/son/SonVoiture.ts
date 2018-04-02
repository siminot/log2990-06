import { SonAbstrait, LISTENER } from "./SonAbstrait";
import { PositionalAudio } from "three";

export class SonVoiture extends SonAbstrait {

    private _audio: PositionalAudio;

    public constructor() {
        super();
        this._audio = new PositionalAudio(LISTENER);
        this.initialisationSon();
    }

    public actualiserSon(rpm: number): void {
        // actualiser le son selon la vitesse/rpm
    }

    protected initialisationSon(): void {
        this._audioLoader.load("./../../../assets/sons/moteur_idle.wav",
                               (buffer: THREE.AudioBuffer) => {
            this._audio.setBuffer(buffer);
            this._audio.setRefDistance(5);
            this._audio.setLoop(true);
            this._audio.play();
        },                     null, null);
    }

    public get obtenirSon(): PositionalAudio {
        return this._audio;
    }

}
