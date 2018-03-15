import { Droite } from "./Droite";
import { Point } from "./Point";

export class ContrainteCroitesementDroite {
// a partir de la je change de fichier ?
  public droitesSeCroisent(droite1: Droite, droite2: Droite): boolean {

    return true;
  }

  private boitesDroitesSeRecourbent(droite1: Droite, droite2: Droite): boolean {
    return droite1.boite.start.x <= droite2.boite.end.x
        && droite1.boite.end.x >= droite2.boite.start.x
        && droite1.boite.start.y <= droite2.boite.end.y
        && droite1.boite.end.y >= droite2.boite.start.y;
  }

  private locationPointParRapportADroite(droite: Droite, point: Point): number {
    const pointTemp: Point = new Point(point.x - droite.plusPetitX, point.y - droite.plusPetitY);

    return droite.pointFinalDroiteCentree.produitVectoriel(pointTemp);
  }

  private pointEstSurDroite(droite: Droite, point: Point): boolean {
    const DEGREE_ERREUR: number = 0.000001;

    return Math.abs(this.locationPointParRapportADroite(droite, point)) < DEGREE_ERREUR;
  }

  private pointEstADroiteDeLaDroite(droite: Droite, point: Point): boolean {
    return this.locationPointParRapportADroite(droite, point) < 0;
  }

  private droiteCroiseOuToucheDroiteInfinie(droite1: Droite, droite2: Droite): boolean {
    const pointDebutdroite2: Point = new Point(droite2.start.x, droite2.start.z);
    const pointFinDroite2: Point = new Point(droite2.end.x, droite2.end.z);

    return this.pointEstSurDroite(droite1, pointDebutdroite2)
        || this.pointEstSurDroite(droite1, pointFinDroite2)
        || (this.pointEstADroiteDeLaDroite(droite1, pointDebutdroite2)
        !== this.pointEstADroiteDeLaDroite(droite1, pointFinDroite2));
  }

}
