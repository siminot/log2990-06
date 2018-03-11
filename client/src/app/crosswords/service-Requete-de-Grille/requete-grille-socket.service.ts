import { Injectable } from "@angular/core";
import { RequeteDeGrilleAbs } from "./requete-de-grilleAbs";

@Injectable()
export class RequeteGrilleSocketService extends RequeteDeGrilleAbs {

  public constructor(/*private socket a modifier */) {
    super();
    this.souscrireRequeteMots();
    // this.grilleDeTest();
  }

  // Requetes

  private souscrireRequeteMots(): void {
/*     this.socket.obtenirMots().subscribe((x) => {
      this._mots = x;
      this.serviceEnvoieMots(this.mots);
      this.serviceEnvoieMatriceLettres(this.matriceDesMotsSurGrille);
      this.insererMotsDansGrille();
    }); */
  }
}
