import { Injectable } from "@angular/core";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { Mot } from "../objetsTest/mot";
import { LettreGrille } from "../objetsTest/lettreGrille";
import { RequeteDeGrilleAbs } from "./requete-de-grilleAbs";

const CASE_NOIR: LettreGrille = { caseDecouverte: false, lettre: "1", lettreDecouverte: false };

@Injectable()
export class RequeteDeGrilleService extends RequeteDeGrilleAbs {

  public constructor(private httpReq: HttpeReqService) {
    super();
    this.souscrireRequeteMots();
    // this.grilleDeTest();
  }

  // Requetes

  private souscrireRequeteMots(): void {
    this.httpReq.obtenirMots().subscribe((x) => {
      this._mots = x;
      this.serviceEnvoieMots(this.mots);
      this.serviceEnvoieMatriceLettres(this.matriceDesMotsSurGrille);
      this.insererMotsDansGrille();
    });
  }
}
