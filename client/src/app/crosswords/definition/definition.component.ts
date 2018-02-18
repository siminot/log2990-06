import { Component, OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { Subscription } from "rxjs/Subscription";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { Word, LettreGrille } from "../mockObject/word";

@Component({
  selector: "app-definition",
  templateUrl: "./definition.component.html",
  styleUrls: ["./definition.component.css"]
})

export class DefinitionComponent implements OnInit, OnDestroy {
  private mots: Word[];
  private matriceDesMotsSurGrille: Array<Array<LettreGrille>>;

  private subscriptionMots: Subscription;
  private subscriptionMatrice: Subscription;
  private subscriptionMotSelec: Subscription;ß

  private reponse: String;
  private motSelectionne: Word;

  public constructor (private listeMotsService: RequeteDeGrilleService) {
    this.mots = this.listeMotsService.getMots();
    this.matriceDesMotsSurGrille = this.listeMotsService.getMatrice();

    this.subscriptionMots = this.listeMotsService.serviceReceptionMots()
      .subscribe((mots) => this.mots = mots);

    this.subscriptionMatrice = this.listeMotsService.serviceReceptionMatriceLettres()
      .subscribe((matrice) => this.matriceDesMotsSurGrille = matrice);

    this.subscriptionMotSelec = this.listeMotsService.serviceReceptionMotSelectionne().subscribe((motSelect)=>{
      this.motSelectionne = motSelect;
      this.changementMotSelectionneFF(this.motSelectionne);
    })

  }
  public ngOnInit(): void { }

  public envoieMots(): void {
    this.listeMotsService.serviceEnvoieMots(this.mots);
  }

  public envoieMatrice(): void {
    this.listeMotsService.serviceEnvoieMatriceLettres(this.matriceDesMotsSurGrille);
  }

  public envoieMotSelectionne(): void {
    this.listeMotsService.serviceEnvoieMotSelectionne(this.motSelectionne);
  }

  public getMatrice(): Array<Array<LettreGrille>> {
    return this.matriceDesMotsSurGrille;
  }
  public getMots(): Word[] {
    return this.mots;
  }

  public setMotSelectionne(motSelectione: Word): void {
    this.motSelectionne = motSelectione;
  }
  public getMotselectionne(): Word {
    return this.motSelectionne;
  }

  public getReponse(): String {
    return this.reponse;
  }

  public setMot(indice: number, nouveauMot: string): void {
    this.mots[indice].mot = nouveauMot;
  }

  public changementMotSelectionne(mot: Word): void {
    for (const item of this.mots) {
      item.activer = false;
    }
    this.motSelectionne = mot;
    mot.activer = !mot.activer;

    this.decouvrirCases(mot);

    this.envoieMotSelectionne();
  }

  public changementMotSelectionneFF(mot: Word): void {
    for (const item of this.mots) {
      item.activer = false;
    }
    this.motSelectionne = mot;
    mot.activer = !mot.activer;
    this.decouvrirCases(mot);
  }

  public decouvrirCases(mot: Word): void {
    this.cacherCases();
    for (let indice: number = 0 ; indice < mot.longeur ; indice++) {
      if (mot.vertical) {
        this.matriceDesMotsSurGrille[mot.premierX][indice + mot.premierY].caseDecouverte = true;
      } else {
        this.matriceDesMotsSurGrille[indice + mot.premierX][mot.premierY].caseDecouverte = true;
      }
    }
    this.envoieMatrice();
  }

  public decouvrirLettre(mot: Word): void {
    for (let indice: number = 0 ; indice < mot.longeur ; indice++) {
      if (mot.vertical) {
        this.matriceDesMotsSurGrille[mot.premierX][indice + mot.premierY].lettreDecouverte = true;
      } else {
        this.matriceDesMotsSurGrille[indice + mot.premierX][mot.premierY].lettreDecouverte = true;
      }
    }
    this.envoieMatrice();
  }

  public cacherCases(): void {
    for (const ligne of this.matriceDesMotsSurGrille) {
      for (const lettre of ligne) {
        // if (lettre.lettreDecouverte == true) {
          lettre.caseDecouverte = false;
        // }
      }
    }
  }

  public verifierTentative(tentative: String): void {
    if (tentative === this.motSelectionne.mot) {
      this.decouvrirLettre(this.motSelectionne);
      this.reponse = "Bonne Reponse !";
    } else {
      this.reponse = "Mauvaise Reponse !";
    }
  }

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
  }

  public afficherRegle(): void {
    alert("Cliquez sur une définition afin d\"effectuer une tentative.");
  }
}
