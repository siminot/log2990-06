import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { TAILLE_TABLEAU } from "../constantes";
import { listeMots } from "../mockObject/mockListWord";
import { Word, LettreGrille } from "../mockObject/word";

@Injectable()
export class RequeteDeGrilleService {
  private mots: Word[];
  private matriceDesMotsSurGrille: Array<Array<LettreGrille>>;

  private listeMotsSujet: Subject<Word[]> = new Subject<Word[]>();
  private matriceDesMotsSurGrilleSujet: Subject<Array<Array<LettreGrille>>> = new Subject<Array<Array<LettreGrille>>>();
  private motSelectionneSuject: Subject<Word> = new Subject<Word>();

  private listeMotsObservable$: Observable<Word[]> = this.listeMotsSujet.asObservable();
  private matriceDesMotsSurGrilleObservable$: Observable<Array<Array<LettreGrille>>> = this.matriceDesMotsSurGrilleSujet.asObservable();
  private motSelectionneObservable$: Observable<Word> = this.motSelectionneSuject.asObservable();

  public constructor( private http: HttpClient ) {
    this.matriceDesMotsSurGrille = this.genererGrille();
    this.mots = listeMots;
    this.putWordsInGrid();
  }

  public serviceEnvoieMots(mots: Word[]): void {
    this.listeMotsSujet.next(mots);
  }

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

)

  public getMots(): Word[] {
    return this.mots;
  }

  public getMatrice(): Array<Array<LettreGrille>> {
    return this.matriceDesMotsSurGrille;
  }

  public genererGrille(): Array<Array<LettreGrille>> {
    const matrice: Array<Array<LettreGrille>> = new Array(TAILLE_TABLEAU);
    let caseNoir: LettreGrille;

    for (let i: number = 0 ; i < TAILLE_TABLEAU ; i++) {
      const row: Array<LettreGrille> = new Array(TAILLE_TABLEAU);
      for (let j: number = 0 ; j < TAILLE_TABLEAU ; j++) {
        caseNoir = { caseDecouverte: false, lettre: "1", lettreDecouverte: false };
        row[j] = caseNoir;
      }
      matrice[i] = row;
    }

    return matrice;
  }

  public putWordsInGrid(): void {
    for (const objMot of this.mots) {
      let tmpLettreGrille: LettreGrille;
      for (let indice: number = 0 ; indice < objMot.longeur ; indice++) {
        tmpLettreGrille = {
          caseDecouverte: false,
          lettre: objMot.mot[indice],
          lettreDecouverte: false
        };

        if (objMot.vertical) {
          this.matriceDesMotsSurGrille[objMot.premierX][indice + objMot.premierY] = tmpLettreGrille;
        } else {
          this.matriceDesMotsSurGrille[indice + objMot.premierX][objMot.premierY] = tmpLettreGrille;
        }
      }
    }
  }
}
