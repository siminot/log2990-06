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
  public tabIndicesGrille: number[] = [0, 1, 2, 3];
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

  public envoieMots(): void {
    this.listeMotsService.serviceEnvoieMots(this.mots);
  }

  public envoieMatrice(): void {
    this.listeMotsService.serviceEnvoieMatriceLettres(this.matriceDesMotsSurGrille);
  }

  public opacite(etat: boolean): String {
    return(etat ? '0' : '1');
  }

  // Pour une autre carte que celle du sprint 1.
  public onKey(event: any): void {
    const element: any = event.srcElement.nextElementSibling;

    if (element != null) {
      const elem: HTMLElement = document.getElementById('testFocus');
      elem.focus();
    }
  }

  // Permet de vérifier si l'assignation des ID est bonne.
  // Pour une autre carte que celle du sprint 1.
  public print(event: any): void {
    // const target: any = event.target || event.srcElement || event.currentTarget;
    // const idAttr: any = target.attributes.id;
  }

  // Pour une autre carte que celle du sprint 1.
  public makeIDs(i: number, j: number): String {
    const a = String(i);
    const b = String(j);

    return a + b;
  }

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
  }
}
