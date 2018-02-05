import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { TAILLE_TABLEAU } from '../constantes';
import { listeMots } from '../mockObject/mockListWord';
import { Word, LettreGrille } from '../mockObject/word';

@Injectable()
export class RequeteDeGrilleService {
  private mots: Word[];
  private matriceDesMotsSurGrille: Array<Array<LettreGrille>>;

  // Création de nos sujets pour le partage des informations au travers des composants (Patron observateur).
  private listeMotsSujet: Subject<Word[]> = new Subject<Word[]>();
  private matriceDesMotsSurGrilleSujet: Subject<Array<Array<LettreGrille>>> = new Subject<Array<Array<LettreGrille>>>();

  // Attribution de la propriété Observable aux suejts.
  private listeMotsObservable$ = this.listeMotsSujet.asObservable();
  private matriceDesMotsSurGrilleObservable$ = this.matriceDesMotsSurGrilleSujet.asObservable();

  // Méthode permettant de share l'information à nos composants.
  serviceEnvoieMots(listeMots:Word[]) {
    this.listeMotsSujet.next(listeMots);
  }
  serviceEnvoieMatriceLettres(matriceLettres:Array<Array<LettreGrille>>) {
    this.matriceDesMotsSurGrilleSujet.next(matriceLettres);
  }

  serviceReceptionMots(): Observable<Word[]> {
    return this.listeMotsObservable$;
  }
  serviceReceptionMatriceLettres(): Observable<Array<Array<LettreGrille>>> {
    return this.matriceDesMotsSurGrilleObservable$;
  }

  getMots(): Word[] {
    return this.mots;
  }

  getMatrice(): Array<Array<LettreGrille>> {
    return this.matriceDesMotsSurGrille;
  }


  constructor() {
    this.matriceDesMotsSurGrille = this.genererGrille();
    this.mots = listeMots;
    this.putWordsInGrid();

  }

  genererGrille(): Array<Array<LettreGrille>>{
    let matrice: Array<Array<LettreGrille>> = new Array(TAILLE_TABLEAU);

    for(let i:number = 0; i < TAILLE_TABLEAU; i++){
      let row: Array<LettreGrille> = new Array(TAILLE_TABLEAU);
      for(let j:number = 0; j < TAILLE_TABLEAU; j++) {
        let caseNoir: LettreGrille = {caseDecouverte: false, lettre:'1', lettreDecouverte: false};
        row[j] = caseNoir;
      }
      matrice[i] = row;
    }
    return matrice;
  }

  putWordsInGrid(): void {
    for (let objMot of this.mots) {
      let tmpLettreGrille:LettreGrille;
      for (let indice:number = 0 ; indice < objMot.longeur ; indice++) {
        tmpLettreGrille = {
          caseDecouverte: false,
          lettre: objMot.mot[indice],
          lettreDecouverte: true
        };

        if(objMot.vertical) {
          this.matriceDesMotsSurGrille[objMot.premierX][indice + objMot.premierY]= tmpLettreGrille;
        } else {
          this.matriceDesMotsSurGrille[indice + objMot.premierX][objMot.premierY]= tmpLettreGrille;
        }
      }
    }
  }
}
