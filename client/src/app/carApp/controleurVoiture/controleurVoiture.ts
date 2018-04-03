import { Voiture } from "../voiture/voiture";
import { Point } from "../elementsGeometrie/point";
import { IObjetEnMouvement } from "../voiture/IObjetEnMouvement";
import { Droite } from "../elementsGeometrie/droite";

const DISTANCE_MINIMALE_PROCHAIN_POINT: number = 1;
const DISTANCE_MINIMALE_COURBE: number = 1;
const VITESSE_MAXIMALE_COURBE: number = 50;

export class ControleurVoiture implements IObjetEnMouvement {

    private pointDestination: Point;

    public constructor(private voiture: Voiture,
                       private piste: Point[]) {
        this.pointDestination = piste[0];
    }

    public miseAJour(temps: number): void {
        this.miseAJourPoint();
        this.ajustementDirection();
        this.ajustementVitesse();
        this.voiture.miseAJour(temps);
    }

    private miseAJourPoint(): void {
        if (this.pointDestinationAtteint) {
            this.passerProchainPoint();
        }
    }

    private ajustementDirection(): void {
        if (this.voitureEstAGauche) {
            this.voiture.virerDroite();
        } else {
            this.voiture.virerGauche();
        }
    }

    private ajustementVitesse(): void {
        if (this.doitDecelererAvantCourbe) {
            this.voiture.relacherAccelerateur();
            this.voiture.freiner();
        } else {
            this.voiture.relacherFreins();
            this.voiture.accelerer();
        }
    }

    private get doitDecelererAvantCourbe(): boolean {
        return this.distanceAvecDestination < DISTANCE_MINIMALE_COURBE &&
               this.voiture.speed.length() > VITESSE_MAXIMALE_COURBE;
    }

    private get pointDestinationAtteint(): boolean {
        return this.distanceAvecDestination < DISTANCE_MINIMALE_PROCHAIN_POINT;
    }

    private get distanceAvecDestination(): number {
        return this.voiture.position.clone().sub(this.pointDestination.vecteurPlanXZ).length();
    }

    private get voitureEstAGauche(): boolean {
        return this.droiteVitesse.estAGaucheDe(this.droiteVersDestination);
    }

    private get angleProchainVirage(): number {
        return this.droiteAvantVirage.angleAvecDroite(this.droiteApresVirage);
    }

    private passerProchainPoint(): void {
        this.pointDestination = this.pointSuivant;
    }

    private get pointPrecedant(): Point {
        return this.piste[(this.indexPointCourant - 1) % this.piste.length];
    }

    private get pointSuivant(): Point {
        return this.piste[(this.indexPointCourant + 1) % this.piste.length];
    }

    private get indexPointCourant(): number {
        return this.piste.findIndex((point: Point) => this.pointDestination === point);
    }

    private get position(): Point {
        return new Point(this.voiture.position.x, this.voiture.position.z);
    }

    private get droiteVitesse(): Droite {
        return new Droite(this.position, this.vitesse.add(this.position));
    }

    private get vitesse(): Point {
        return new Point(this.voiture.speed.x, this.voiture.speed.z);
    }

    private get droiteVersDestination(): Droite {
        return new Droite(this.position, this.pointDestination);
    }

    private get droiteAvantVirage(): Droite {
        return new Droite(this.pointPrecedant, this.pointDestination);
    }

    private get droiteApresVirage(): Droite {
        return new Droite(this.pointDestination, this.pointSuivant);
    }
}
