import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { TAILLE_TABLEAU } from "../constantes";
import { Mot } from "../objetsTest/mot";
import { LettreGrille } from "../objetsTest/lettreGrille";
import { listeMotsLongue } from "./../objetsTest/objetsTest";

const CASE_NOIR: LettreGrille = { caseDecouverte: false, lettre: "1", lettreDecouverte: false };

@Injectable()
export class RequeteDeGrilleService {
  private _mots: Mot[];
  private matriceDesMotsSurGrille: Array<Array<LettreGrille>>;

  private listeMotsSujet: Subject<Mot[]> = new Subject<Mot[]>();
  private matriceDesMotsSurGrilleSujet: Subject<Array<Array<LettreGrille>>> = new Subject<Array<Array<LettreGrille>>>();
  private motSelectionneSuject: Subject<Mot> = new Subject<Mot>();
  private listeMotsObservable$: Observable<Mot[]> = this.listeMotsSujet.asObservable();
  private matriceDesMotsSurGrilleObservable$: Observable<Array<Array<LettreGrille>>> = this.matriceDesMotsSurGrilleSujet.asObservable();
  private motSelectionneObservable$: Observable<Mot> = this.motSelectionneSuject.asObservable();

  public constructor(/*private httpReq: HttpeReqService*/) {
    this.genererGrille();
    // this.souscrireRequeteMots();
    this.grilleDeTest();
  }
  // Accesseurs

  public get mots(): Mot[] {
    return this._mots;
  }

  public get matrice(): Array<Array<LettreGrille>> {
    return this.matriceDesMotsSurGrille;
  }

  private genererGrille(): void {
    this.matriceDesMotsSurGrille = new Array<Array<LettreGrille>>();
    for (let i: number = 0; i < TAILLE_TABLEAU; i++) {
      this.matriceDesMotsSurGrille.push(new Array<LettreGrille>(TAILLE_TABLEAU));
      for (let j: number = 0; j < TAILLE_TABLEAU; j++) {
        this.matriceDesMotsSurGrille[i][j] = CASE_NOIR;
      }
    }
  }

  // Requetes


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
  }
}
