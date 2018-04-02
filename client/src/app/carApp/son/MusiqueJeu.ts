import { SonAbstrait, LISTENER } from "./SonAbstrait";
import { Audio } from "three";

export class MusiqueJeu extends SonAbstrait {

    private _audio: Audio;

    public constructor() {
        super();
        this._audio = new Audio(LISTENER);
        this.initialisationSon();
    }

    protected initialisationSon(): void {
        this._audioLoader.load("./../../../assets/sons/JELAIPASENCORE",
                               (buffer: THREE.AudioBuffer) => {
            this._audio.setBuffer(buffer);
        },                     null, null);
    }

    public jouerSon(): void {
        this._audio.play();
    }

}
