import { Voiture } from "../voiture/voiture";
import { Point } from "../elementsGeometrie/point";
import { IObjetEnMouvement } from "../voiture/IObjetEnMouvement";

export class ControleurVoiture implements IObjetEnMouvement {

    private pointDestination: Point;

    public constructor(private voiture: Voiture,
                       private piste: Point[]) {

    }

    public miseAJour(temps: number): void {
        this.ajustementDirection();
    }

    private ajustementDirection(): void {
        return ;
    }

    private ajustementVitesse(): void {

    }

    private get pointDestinationAtteint(): boolean {
        return true;
    }

    private get distanceAvecDestination(): number {
        return 0;
    }

    private get angleAvecDestination(): number {
        return 0;
    }

    private get angleProchainVirage(): number {
        return 0;
    }

    private passerProchainPoint(): void {
        return ;
    }

}
