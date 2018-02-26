import { Component, OnInit } from "@angular/core";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { Subscription } from "rxjs/Subscription";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import { Word, LettreGrille } from "../mockObject/word";

const MESSAGE_BONNE_REPONSE: string = "Bonne réponse !";
const MESSAGE_MAUVAISE_REPONSE: string = "Mauvaise réponse !";
const REGLE_JEU: string = "Cliquez sur une définition afin d'effectuer une tentative.";

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
  private subscriptionMotSelec: Subscription;

  private reponse: String;
  private motSelectionne: Word;

  public constructor (private listeMotsService: RequeteDeGrilleService) {
    this.mots = this.listeMotsService.getMots();
    this.matriceDesMotsSurGrille = this.listeMotsService.getMatrice();

    this.initialiserSouscriptions();
  }

  private initialiserSouscriptions(): void {
    this.souscrireReceptionMots();
    this.souscrireReceptionMatrice();
    this.souscrireSelectionMots();
  }

  private souscrireReceptionMots(): void {
    this.subscriptionMots = this.listeMotsService.serviceReceptionMots()
    .subscribe((mots) => this.mots = mots);
  }

  private souscrireReceptionMatrice(): void {
    this.subscriptionMatrice = this.listeMotsService.serviceReceptionMatriceLettres()
      .subscribe((matrice) => this.matriceDesMotsSurGrille = matrice);
  }

  private souscrireSelectionMots(): void {
    this.subscriptionMotSelec = this.listeMotsService.serviceReceptionMotSelectionne().subscribe((motSelect) => {
      this.motSelectionne = motSelect;
      this.miseAJourMotSelectionne(this.motSelectionne);
    });
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
    this.miseAJourMotSelectionne(mot);
    this.envoieMotSelectionne();
  }

  private miseAJourMotSelectionne(mot: Word): void {
    this.changementMot(mot);
    this.decouvrirCases(mot);
  }

  private changementMot(mot: Word): void {
    this.mots.forEach((element: Word) => element.activer = false);
    this.motSelectionne = mot;
    mot.activer = !mot.activer;
  }

  private decouvrirCases(mot: Word): void {
    this.cacherCases();
    for (let indice: number = 0 ; indice < mot.longeur ; indice++) {
      mot.estVertical
        ? this.obtenirLettreGrilleMotVertical(mot, indice).caseDecouverte = true
        : this.obtenirLettreGrilleMotHorizontal(mot, indice).caseDecouverte = true;
    }
    this.envoieMatrice();
  }

  private decouvrirLettre(mot: Word): void {
    for (let indice: number = 0 ; indice < mot.longeur ; indice++) {
      mot.estVertical
        ? this.obtenirLettreGrilleMotVertical(mot, indice).lettreDecouverte = true
        : this.obtenirLettreGrilleMotHorizontal(mot, indice).lettreDecouverte = true;
    }
    this.envoieMatrice();
  }

  private obtenirLettreGrilleMotVertical(mot: Word, indice: number): LettreGrille {
    return this.matriceDesMotsSurGrille[mot.premierX][indice + mot.premierY];
  }

  private obtenirLettreGrilleMotHorizontal(mot: Word, indice: number): LettreGrille {
    return this.matriceDesMotsSurGrille[indice + mot.premierX][mot.premierY];
  }

  private cacherCases(): void {
    for (const ligne of this.matriceDesMotsSurGrille) {
      for (const lettre of ligne) {
          lettre.caseDecouverte = false;
      }
    }
  }

  public verifierTentative(tentative: String): void {
    if (tentative === this.motSelectionne.mot) {
      this.decouvrirLettre(this.motSelectionne);
      this.reponse = MESSAGE_BONNE_REPONSE;
    } else {
      this.reponse = MESSAGE_MAUVAISE_REPONSE;
    }
  }

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
  }

  public afficherRegle(): void {
    alert(REGLE_JEU);
  }
}
