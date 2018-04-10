import { Voiture } from "../voiture/voiture";
import { Point } from "../elementsGeometrie/point";
import { IObjetEnMouvement } from "../voiture/IObjetEnMouvement";
import { Droite } from "../elementsGeometrie/droite";

const DISTANCE_MINIMALE_PROCHAIN_POINT: number = 10;
const DISTANCE_MINIMALE_COURBE: number = 25;
const VITESSE_MINIMALE: number = 20;
const VITESSE_MAXIMALE: number = 40;
const VITESSE_MAXIMALE_COURBE: number = 6;
const DEUX: number = 2;
const ANGLE_VIRAGE_SERRE: number = Math.PI / DEUX;

export class ControleurVoiture implements IObjetEnMouvement {

    private pointDestination: Point;

    public constructor(private voiture: Voiture,
                       private piste: Point[]) {
        this.pointDestination =
            piste !== undefined && piste[0] !== undefined
            ? piste[0]
            : null;
    }

    public miseAJour(temps: number): void {
        if (this.pointDestination !== null) {
            this.voiture.miseAJour(temps);
            this.miseAJourPoint();
            this.ajustementDirection();
            this.ajustementVitesse();
        }
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
        if (this.doitDecelererAvantCourbe || this.doitDecelerer) {
            this.voiture.relacherAccelerateur();
            this.voiture.freiner();
        } else if (this.doitAccelerer) {
            this.voiture.relacherFreins();
            this.voiture.accelerer();
        } else {
            this.voiture.relacherAccelerateur();
        }
    }

    private get doitAccelerer(): boolean {
        return this.voiture.speed.length() < VITESSE_MINIMALE;
    }

    private get doitDecelerer(): boolean {
        return this.voiture.speed.length() > VITESSE_MAXIMALE;
    }

    private get doitDecelererAvantCourbe(): boolean {
        return this.distanceAvecDestination < DISTANCE_MINIMALE_COURBE &&
               this.voiture.speed.length() > VITESSE_MAXIMALE_COURBE &&
               this.virageEstSerre;
    }

    private get virageEstSerre(): boolean {
        return this.angleProchainVirage < ANGLE_VIRAGE_SERRE;
    }

    private get pointDestinationAtteint(): boolean {
        return this.distanceAvecDestination < DISTANCE_MINIMALE_PROCHAIN_POINT;
    }

    private get distanceAvecDestination(): number {
        return this.voiture.position.clone().sub(this.pointDestination.vecteurPlanXZ).length();
    }

    private get voitureEstAGauche(): boolean {
        return this.droiteDirection.estAGaucheDe(this.droiteVersDestination);
    }

    private get angleProchainVirage(): number {
        return this.droiteAvantVirage.angleAvecDroite(this.droiteApresVirage);
    }

    private passerProchainPoint(): void {
        this.pointDestination = this.pointSuivant;
    }

    private get pointPrecedant(): Point {
        return this.piste[(this.indexPointCourant + this.piste.length - 1) % this.piste.length];
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

    private get droiteDirection(): Droite {
        return new Droite(this.position, this.direction.add(this.position));
    }

    private get direction(): Point {
        return new Point(this.voiture.direction.x, this.voiture.direction.z);
    }

    private get droiteVersDestination(): Droite {
        return new Droite(this.position, this.pointDestination);
    }

    private get droiteAvantVirage(): Droite {
        return new Droite(this.pointDestination, this.pointPrecedant);
    }

    private get droiteApresVirage(): Droite {
        return new Droite(this.pointDestination, this.pointSuivant);
    }
}
