import { Camera, Vector3 } from "three";
import { Voiture } from "../voiture/voiture";

export abstract class CameraJeu {

    protected voitureSuivie: Voiture;

    public abstract get camera(): Camera;

    public constructor() {
        this.voitureSuivie = null;
    }

    protected abstract reglerPositionnement(POSITION: Vector3): void;
    protected abstract obtenirPositionRelative(): Vector3;
    protected abstract calculerNouvellePositionAbsolue(position: Vector3): Vector3;
    public abstract zoomer(): void;
    public abstract dezoomer(): void;
    public abstract redimensionnement(largeur: number, hauteur: number): void;

    public miseAJourVoitureSuivie(voiture: Voiture): void {
        this.voitureSuivie = voiture;
    }

    public mettreAJour(): void {
        this.reglerPositionnement(this.calculerNouvellePositionAbsolue(this.obtenirPositionRelative()));
    }
}
