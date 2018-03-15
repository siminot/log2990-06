import { Droite } from "./Droite";
import { Point } from "./Point";

export static class ContrainteCroitesementDroite {
// a partir de la je change de fichier ?
  public croiseDroite(droite1: Droite, droite2: Droite): boolean {

    return true;
  }

  private boitesDroitesSeRecourbent(droite1: Droite, droite2: Droite): boolean {
    return droite1.boite.start.x <= droite2.boite.end.x
        && droite1.boite.end.x >= droite2.boite.start.x
        && droite1.boite.start.y <= droite2.boite.end.y
        && droite1.boite.end.y >= droite2.boite.start.y;
  }

  private pointEstSurDroite(droite: Droite, point: Point): boolean {
    const DEGREE_ERREUR: number = 0.000001;

    return Math.abs(droite.locationPointParRapportADroite(point)) < DEGREE_ERREUR;
  }

  private pointEstADroiteDeLaDroite(droite: Droite, point: Point): boolean {
    return droite.locationPointParRapportADroite(point) < 0;
  }

  private droiteCroiseOuToucheDroiteInfinie(droite1: Droite, droite2: Droite): boolean {
    const pointDebutdroite2: Point = new Point(droite2.start.x, droite2.start.z);
    const pointFinDroite2: Point = new Point(droite2.end.x, droite2.end.z);

    return droite1.pointEstSurDroite(pointDebutdroite2)
          || droite1.pointEstSurDroite(pointFinDroite2)
          || droite1.

  }

}
