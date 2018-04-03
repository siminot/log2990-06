import { SonAbstrait, LISTENER } from "./SonAbstrait";
import { PositionalAudio } from "three";
import { DEFAULT_MINIMUM_RPM, DEFAULT_MAX_RPM } from "../voiture/engine";

const DELTA_VITESSE_MAX: number = 2;

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
        const ratioVitesse: number = ((rpm - DEFAULT_MINIMUM_RPM) /
        (DEFAULT_MAX_RPM - DEFAULT_MINIMUM_RPM)) * DELTA_VITESSE_MAX + 1;
        this._audioAcceleration.playbackRate = ratioVitesse; // ratioVitesse varie de 1 a DELTA_VITESSE_MAX + 1
    }

    protected initialisationSon(): void {
        this.initialisationSonRepos();
        this.initialisationSonAcceleration();
    }

    private initialisationSonRepos(): void {
        this._audioLoader.load("./../../../assets/sons/moteur_idle.wav", (buffer: THREE.AudioBuffer) => {
            this._audioRepos.setBuffer(buffer);
            this._audioRepos.setRefDistance(this.distanceRef);
            this._audioRepos.setLoop(true);
        },                     null, null);
    }

    private initialisationSonAcceleration(): void {
        this._audioLoader.load("./../../../assets/sons/moteur_accel.wav", (buffer: THREE.AudioBuffer) => {
            this._audioAcceleration.setBuffer(buffer);
            this._audioAcceleration.setRefDistance(this.distanceRef);
            this._audioAcceleration.setLoop(true);
        },                     null, null);
    }

    public jouerRepos(): void {
        this._audioAcceleration.stop();
        this._audioRepos.play();
    }

    public jouerAccel(): void {
        this._audioRepos.stop();
        this._audioAcceleration.play();
    }

    public get obtenirSon(): PositionalAudio {
        return this._audioRepos;
    }

}
