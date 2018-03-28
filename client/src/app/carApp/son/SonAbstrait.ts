import { AudioListener, AudioLoader } from "three";
import { GestionnaireCamera } from "../camera/GestionnaireCamera";

export abstract class SonAbstrait {

    protected _audioListener: AudioListener;
    protected _audioLoader: AudioLoader;
    private gestionnaireCamera: GestionnaireCamera;

    public constructor() {
        this._audioListener = new AudioListener();
        this.gestionnaireCamera.camera.add(this._audioListener); // <-- je suis pas certain qu'il sagit de la vrai camera
        this.initialisationSon();
    }

    protected abstract initialisationSon(): void;

}
