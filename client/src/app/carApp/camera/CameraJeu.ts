import { PerspectiveCamera, Vector3 } from "three";
import { Voiture } from "../voiture/voiture";

export abstract class CameraJeu extends PerspectiveCamera {

    protected rayon: number;
    protected voitureSuivie: Voiture;

    public constructor(CHAMP_DE_VISION: number, PLAN_RAPPROCHE: number, PLAN_ELOIGNE: number) {
        super(
            CHAMP_DE_VISION,
            null,
            PLAN_RAPPROCHE,
            PLAN_ELOIGNE
        );
    }

    protected abstract reglerPositionnement(POSITION: Vector3): void;
    protected abstract obtenirPositionRelative(): Vector3;
    public abstract zoomer(): void;
    public abstract dezoomer(): void;

    public redimensionnement(ratio: number): void {
        this.aspect = ratio;
        this.updateProjectionMatrix();
    }

    public miseAJourVoitureSuivie(voiture: Voiture): void {
        this.voitureSuivie = voiture;
    }

    public mettreAJour(): void {
        this.reglerPositionnement(this.calculerNouvellePositionAbsolue(this.obtenirPositionRelative()));
    }

    private calculerNouvellePositionAbsolue(position: Vector3): Vector3 {
        return position.normalize()
            .multiplyScalar(this.rayon)
            .add(this.voitureSuivie.getPosition());
    }
}
