import { SonAbstrait, LISTENER } from "./SonAbstrait";
import { PositionalAudio } from "three";

export class SonSortieRoute extends SonAbstrait {

    private _audio: PositionalAudio;

    public constructor() {
        super();
        this._audio = new PositionalAudio(LISTENER);
        this.initialisationSon();
    }

    protected initialisationSon(): void {
        this._audioLoader.load("./../../../assets/sons/JELAIPASENCORE",
                               (buffer: THREE.AudioBuffer) => {
            this._audio.setBuffer(buffer);
            this._audio.setRefDistance(this.distanceRef);
            this._audio.setLoop(true);
        },                     null, null);
    }

    public jouerSon(): void {
        this._audio.play();
    }

    public get obtenirSon(): PositionalAudio {
        return this._audio;
    }

}
