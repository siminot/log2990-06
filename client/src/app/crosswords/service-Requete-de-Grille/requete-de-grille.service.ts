import { Injectable } from "@angular/core";
<<<<<<< HEAD
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
// import { HttpeReqService } from "../httpRequest/http-request.service";
import { TAILLE_TABLEAU } from "../constantes";
import { Mot } from "../objetsTest/mot";
import { LettreGrille } from "../objetsTest/lettreGrille";
import { listeMotsLongue } from "./../objetsTest/objetsTest";
import { ServiceSocketService} from "../service-socket/service-socket.service"
const CASE_NOIR: LettreGrille = { caseDecouverte: false, lettre: "1", lettreDecouverte: false };
=======
import { HttpeReqService } from "../httpRequest/http-request.service";
import { RequeteDeGrilleAbs } from "./requete-de-grilleAbs";
>>>>>>> abstractionGrille

@Injectable()
export class RequeteDeGrilleService extends RequeteDeGrilleAbs {

<<<<<<< HEAD
  public constructor(public socket: ServiceSocketService/*private httpReq: HttpeReqService*/) {
    this.genererGrille();
    // this.souscrireRequeteMots();
    this.grilleDeTest();
=======
  public constructor(private httpReq: HttpeReqService) {
    super();
    this.souscrireRequeteMots();
    // this.grilleDeTest();
>>>>>>> abstractionGrille
  }

  // Requetes

<<<<<<< HEAD

  // private souscrireRequeteMots(): void {
  //   this.httpReq.obtenirMots().subscribe((x) => {
  //     this._mots = x;
  //     this.serviceEnvoieMots(this.mots);
  //     this.serviceEnvoieMatriceLettres(this.matriceDesMotsSurGrille);
  //     this.insererMotsDansGrille();
  //   });
  // }

  private grilleDeTest(): void {
    this._mots = listeMotsLongue;
    this.serviceEnvoieMots(this.mots);
    this.serviceEnvoieMatriceLettres(this.matriceDesMotsSurGrille);
    this.insererMotsDansGrille();
  }

  // Traitement de la grille

  private insererMotsDansGrille(): void {
    for (const objMot of this.mots) {
      for (let indice: number = 0; indice < objMot.longueur; indice++) {
        this.assignerLettre(objMot, indice);
      }
    }
  }

  private assignerLettre(objMot: Mot, indice: number): void {
    objMot.estVertical
      ? this.matriceDesMotsSurGrille[objMot.premierX][indice + objMot.premierY] = this.obtenirLettre(objMot, indice)
      : this.matriceDesMotsSurGrille[indice + objMot.premierX][objMot.premierY] = this.obtenirLettre(objMot, indice);
  }

  private obtenirLettre(objMot: Mot, indice: number): LettreGrille {
    return {
      caseDecouverte: false,
      lettre: objMot.mot[indice],
      lettreDecouverte: false
    };
  }

  // Services publics
  public serviceEnvoieMots(mots: Mot[]): void {
    this.listeMotsSujet.next(mots);
  }

  public serviceEnvoieMatriceLettres(matriceLettres: Array<Array<LettreGrille>>): void {
    this.matriceDesMotsSurGrilleSujet.next(matriceLettres);
  }

  public serviceEnvoieMotSelectionne(motSelec: Mot): void {
    this.motSelectionneSuject.next(motSelec);
  }

  public serviceReceptionMots(): Observable<Mot[]> {
    return this.listeMotsObservable$;
  }

  public serviceReceptionMatriceLettres(): Observable<Array<Array<LettreGrille>>> {
    return this.matriceDesMotsSurGrilleObservable$;
  }

  public serviceReceptionMotSelectionne(): Observable<Mot> {
    return this.motSelectionneObservable$;
=======
  private souscrireRequeteMots(): void {
    this.httpReq.obtenirMots().subscribe((x) => {
      this._mots = x;
      this.serviceEnvoieMots(this.mots);
      this.serviceEnvoieMatriceLettres(this.matriceDesMotsSurGrille);
      this.insererMotsDansGrille();
    });
>>>>>>> abstractionGrille
  }
}
