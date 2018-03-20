import { Droite } from "./droite";
import { Point } from "./Point";

export class ContrainteCroisementDroite {

    public static droitesSeCroisent(droite1: Droite, droite2: Droite): boolean {

        return this.boitesDroitesSeRecourbent(droite1.boite, droite2.boite)
                && this.droiteCroiseOuToucheDroiteInfinie(droite1, droite2)
                && this.droiteCroiseOuToucheDroiteInfinie(droite2, droite1);
    }

    private static boitesDroitesSeRecourbent(droite1: Droite, droite2: Droite): boolean {
        return droite1.boite.start.x <= droite2.boite.end.x
                && droite1.boite.end.x >= droite2.boite.start.x
                && droite1.boite.start.z <= droite2.boite.end.z
                && droite1.boite.end.z >= droite2.boite.start.z;
    }

    private static locationPointParRapportADroite(droite: Droite, point: Point): number {
        const pointTemp: Point = new Point(point.x - droite.start.x, point.y - droite.start.z);

        return droite.pointFinalDroiteCentree.produitVectoriel(pointTemp);
    }

    private static pointEstSurDroite(droite: Droite, point: Point): boolean {
        const DEGREE_ERREUR: number = 0.000001; // necessaire?

        return Math.abs(this.locationPointParRapportADroite(droite, point)) < DEGREE_ERREUR;
    }

    private static pointEstADroiteDeLaDroite(droite: Droite, point: Point): boolean {
        return this.locationPointParRapportADroite(droite, point) < 0;
    }

    private static droiteCroiseOuToucheDroiteInfinie(droiteInfinie: Droite, droite: Droite): boolean {
        const pointDebutDroite: Point = new Point(droite.start.x, droite.start.z);
        const pointFinDroite: Point = new Point(droite.end.x, droite.end.z);

        return this.pointEstSurDroite(droiteInfinie, pointDebutDroite)
                || this.pointEstSurDroite(droiteInfinie, pointFinDroite)
                || (this.pointEstADroiteDeLaDroite(droiteInfinie, pointDebutDroite)
                    !== this.pointEstADroiteDeLaDroite(droiteInfinie, pointFinDroite));
    }

}
