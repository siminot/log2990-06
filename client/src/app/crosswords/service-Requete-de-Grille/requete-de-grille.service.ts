import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpeReqService } from "../httpRequest/http-request.service";
import { TAILLE_TABLEAU } from "../constantes";
import { Word, LettreGrille } from "../mockObject/word";

@Injectable()
export class RequeteDeGrilleService {
  private _mots: Word[];
  private matriceDesMotsSurGrille: Array<Array<LettreGrille>>;

  private listeMotsSujet: Subject<Word[]> = new Subject<Word[]>();
  private matriceDesMotsSurGrilleSujet: Subject<Array<Array<LettreGrille>>> = new Subject<Array<Array<LettreGrille>>>();
  private motSelectionneSuject: Subject<Word> = new Subject<Word>();
  private listeMotsObservable$: Observable<Word[]> = this.listeMotsSujet.asObservable();
  private matriceDesMotsSurGrilleObservable$: Observable<Array<Array<LettreGrille>>> = this.matriceDesMotsSurGrilleSujet.asObservable();
  private motSelectionneObservable$: Observable<Word> = this.motSelectionneSuject.asObservable();

  // Accesseurs

  public get mots(): Word[] {
    return this._mots;
  }

  public get matrice(): Array<Array<LettreGrille>> {
    return this.matriceDesMotsSurGrille;
  }

  public constructor(private httpReq: HttpeReqService) {
    this.matriceDesMotsSurGrille = this.genererGrille();
    this.souscrireRequeteMots();
  }

  // Requetes

  private souscrireRequeteMots(): void {
    this.httpReq.getWord().subscribe((x) => {
      this._mots = x;
      this.serviceEnvoieMots(this.mots);
      this.serviceEnvoieMatriceLettres(this.matriceDesMotsSurGrille);
      this.insererMotsDansGrille();
    });
  }

  private serviceEnvoieMots(mots: Word[]): void {
    this.listeMotsSujet.next(mots);
  }

  // Services publics

  public serviceEnvoieMatriceLettres(matriceLettres: Array<Array<LettreGrille>>): void {
    this.matriceDesMotsSurGrilleSujet.next(matriceLettres);
  }

  public serviceEnvoieMotSelectionne(motSelec: Word): void {
    this.motSelectionneSuject.next(motSelec);
  }

  public serviceReceptionMots(): Observable<Word[]> {
    return this.listeMotsObservable$;
  }

  public serviceReceptionMatriceLettres(): Observable<Array<Array<LettreGrille>>> {
    return this.matriceDesMotsSurGrilleObservable$;
  }

  public serviceReceptionMotSelectionne(): Observable<Word> {
    return this.motSelectionneObservable$;
  }

  private genererGrille(): Array<Array<LettreGrille>> {
    const matrice: Array<Array<LettreGrille>> = new Array(TAILLE_TABLEAU);
    let caseNoir: LettreGrille;

    for (let i: number = 0; i < TAILLE_TABLEAU; i++) {
      const row: Array<LettreGrille> = new Array(TAILLE_TABLEAU);
      for (let j: number = 0; j < TAILLE_TABLEAU; j++) {
        caseNoir = { caseDecouverte: false, lettre: "1", lettreDecouverte: false };
        row[j] = caseNoir;
      }
      matrice[i] = row;
    }

    return matrice;
  }

  private insererMotsDansGrille(): void {
    for (const objMot of this.mots) {
      let tmpLettreGrille: LettreGrille;
      for (let indice: number = 0; indice < objMot.longeur; indice++) {
        tmpLettreGrille = {
          caseDecouverte: false,
          lettre: objMot.mot[indice],
          lettreDecouverte: false
        };

        if (objMot.estVertical) {
          this.matriceDesMotsSurGrille[objMot.premierX][indice + objMot.premierY] = tmpLettreGrille;
        } else {
          this.matriceDesMotsSurGrille[indice + objMot.premierX][objMot.premierY] = tmpLettreGrille;
        }
      }
    }
  }
}
