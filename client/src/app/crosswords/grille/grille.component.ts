import { Component, OnInit } from '@angular/core';
import { Word, LettreGrille } from '../mockObject/word';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})

export class GrilleComponent implements OnInit, OnDestroy {
  private mots: Word[];
  private matriceDesMotsSurGrille: Array<Array<LettreGrille>>;
  private subscriptionMots: Subscription;
  private subscriptionMatrice: Subscription;

  public constructor(private listeMotsService: RequeteDeGrilleService) {
    this.mots = this.listeMotsService.getMots();
    this.matriceDesMotsSurGrille = this.listeMotsService.getMatrice();

    this.subscriptionMots = this.listeMotsService.serviceReceptionMots()
      .subscribe((mots) => this.mots = mots);

    this.subscriptionMatrice = this.listeMotsService.serviceReceptionMatriceLettres()
      .subscribe((matrice) => this.matriceDesMotsSurGrille = matrice);
  }

  public ngOnInit(): void { }

  public getListeMots(): Word[] {
    return this.mots;
  }

  public getMatrice(): Array<Array<LettreGrille>> {
    return this.matriceDesMotsSurGrille;
  }

  public opacite(etat: boolean): String {
    return(etat ? '0' : '1');
  }

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
  }
}

  /*
  ** Pour une autre carte que celle du sprint 1. **
  public onKey(event: any): void {
    const element: any = event.srcElement.nextElementSibling;

    if (element != null) {
      const elem: HTMLElement = document.getElementById('testFocus');
      elem.focus();
    }
  }

  // ** Pour une autre carte que celle du sprint 1. **
  public makeIDs(i: number, j: number): String {
    const a = String(i);
    const b = String(j);

    return a + b;
  }
  */