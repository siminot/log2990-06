import { AudioListener, AudioLoader } from "three";

export const LISTENER: AudioListener = new AudioListener();

export abstract class SonAbstrait {

    protected _audioLoader: AudioLoader;
    protected readonly distanceRef: number = 10;

    public constructor() {
        this._audioLoader = new AudioLoader();
        this.initialisationSon();
    }

    protected abstract initialisationSon(): void;

}
