import { Component, OnInit } from '@angular/core';
import { Word, LettreGrille } from '../mockObject/word';
import { Subscription } from 'rxjs/Subscription';

import { RequeteDeGrilleService } from '../service-Requete-de-Grille/requete-de-grille.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-grille',
  templateUrl: './grille.component.html',
  styleUrls: ['./grille.component.css']
})

export class GrilleComponent implements OnInit, OnDestroy {
  private mots: Word[];
  public matriceDesMotsSurGrille: Array<Array<LettreGrille>>;
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

  private ngOnInit(): void { }

  private envoieMots(): void {
    this.listeMotsService.serviceEnvoieMots(this.mots);
  }

  private envoieMatrice(): void {
    this.listeMotsService.serviceEnvoieMatriceLettres(this.matriceDesMotsSurGrille);
  }

  private opacite(etat: boolean): String {
    return(etat ? '0' : '1');
  }

  private onKey(event: any) {
    const element: any = event.srcElement.nextElementSibling;

    if (element != null) {
      let elem = document.getElementById("testFocus");
      elem.focus();
    }
  }

  print(event:any):void {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    console.log(idAttr);
  }

  makeIDs(i:any, j:any): any{
    let a = String(i);
    let b = String(j);
    return a+b;
  }

  ngOnDestroy() {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
  }
}
