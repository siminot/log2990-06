import { SonAbstrait, LISTENER } from "./SonAbstrait";
import { PositionalAudio } from "three";
import { DEFAULT_MINIMUM_RPM, DEFAULT_MAX_RPM } from "../voiture/engine";

const DELTA_VITESSE_MAX: number = 1.25;

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
        this._audioAcceleration.setPlaybackRate(ratioVitesse);
    }

    protected initialisationSon(): void {
        this.initialisationSonAcceleration();
        this.initialisationSonRepos();
    }

    private initialisationSonRepos(): void {
        this._audioLoader.load("./../../../assets/sons/moteur_idle.wav", (buffer: THREE.AudioBuffer) => {
            this._audioRepos.setBuffer(buffer);
            this._audioRepos.setRefDistance(this.distanceRef);
            this._audioRepos.setLoop(true);
            this.jouerRepos();
        },                     () => {}, () => {});
    }

    private  initialisationSonAcceleration(): void {
        this._audioLoader.load("./../../../assets/sons/moteur_accel.wav", (buffer: THREE.AudioBuffer) => {
            this._audioAcceleration.setBuffer(buffer);
            this._audioAcceleration.setRefDistance(this.distanceRef);
            this._audioAcceleration.setLoop(true);
        },                     () => {}, () => {});
    }

    public jouerRepos(): void {
        if (!this._audioRepos.isPlaying) {
            this._audioRepos.play();
        }
        try {
            this._audioAcceleration.stop();
        } catch (e) {
            // Rien a faire ici, car le son n'est pas encore charger
        }
    }

    public jouerAccel(): void {
        if (!this._audioAcceleration.isPlaying) {
            this._audioAcceleration.play();
        }
    }

    public get obtenirSonRepos(): PositionalAudio {
        return this._audioRepos;
    }

    public get obtenirSonAccel(): PositionalAudio {
        return this._audioAcceleration;
    }

}
