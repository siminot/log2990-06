import { GrilleAbs } from ".././grilleAbs";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";

export class GrilleMultijoueurs extends GrilleAbs {

  public constructor(_servicePointage: InfojoueurService,
                     /*private serviceSocket*/) {
    super(_servicePointage);
  }

  public envoyerMotSelec(): void {
    return;
  }

  public recevoirMotSelec(): void {
    this.encadrerMotAutreJoueur();
  }

  public envoyerMotRempli(): void {
    return;
  }

  public recevoirMotRempli(): void {
    this.remplirMotAutreJoueur();
  }

  private encadrerMotAutreJoueur(): void {
    return;
  }

  private remplirMotAutreJoueur(): void {
    return;
  }
}
