import { SonAbstrait, LISTENER } from "./SonAbstrait";
import { PositionalAudio } from "three";

export class SonVoiture extends SonAbstrait {

    private _audioRepos: PositionalAudio;
    private _audioAcceleration: PositionalAudio;

    public constructor() {
        super();
        this._audioRepos = new PositionalAudio(LISTENER);
        this._audioAcceleration = new PositionalAudio(LISTENER);
        this.initialisationSon();
    }

    public actualiserSon(rpm: number): void {
        // actualiser le son selon la vitesse/rpm
    }

    protected initialisationSon(): void {
        this.initialisationSonRepos();
        // this.initialisationSonAcceleration();
    }

    private initialisationSonRepos(): void {
        this._audioLoader.load("./../../../assets/sons/moteur_idle.wav", (buffer: THREE.AudioBuffer) => {
            this._audioRepos.setBuffer(buffer);
            this._audioRepos.setRefDistance(this.distanceRef);
            this._audioRepos.setLoop(true);
        },                     null, null);
    }

    private initialisationSonAcceleration(): void {
        this._audioLoader.load("./../../../assets/sons/MOTEUR QUI ACCEL", (buffer: THREE.AudioBuffer) => {
            this._audioAcceleration.setBuffer(buffer);
            this._audioAcceleration.setRefDistance(this.distanceRef);
            this._audioAcceleration.setLoop(true);
        },                     null, null);
    }

    public jouerRepos(): void {
        // this._audioAcceleration.stop();
        this._audioRepos.play();
    }

    public jouerAccel(): void {
        this._audioRepos.stop();
        // this._audioAcceleration.play();
    }

    public ajustemetSonSelonRPM(rpm: number): void {
        // formule qui change le playback du son d'accel
        this._audioAcceleration.playbackRate = 1;
    }

    public get obtenirSon(): PositionalAudio {
        return this._audioRepos;
    }

}
