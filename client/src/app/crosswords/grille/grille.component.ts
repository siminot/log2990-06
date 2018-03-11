import { Component, OnInit } from "@angular/core";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
<<<<<<< HEAD
import * as CONST from "../constantes";
// import { InfojoueurService } from "../service-info-joueur/infojoueur.service";

import { MiseEnEvidence } from "./miseEnEvidence";
import { GrilleFocus } from "./grilleFocus";
=======
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "./encadrementCase";
import { GrilleAbs } from "./grilleAbs";
>>>>>>> abstractionGrille

@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

<<<<<<< HEAD
export class GrilleComponent implements OnInit, OnDestroy {
  protected mots: Mot[];
  protected matriceDesMotsSurGrille: Array<Array<LettreGrille>>;
  protected motSelectionne: Mot;
  protected lockedLetter: boolean[][];

  protected subscriptionMots: Subscription;
  protected subscriptionMatrice: Subscription;
  protected subscriptionMotSelec: Subscription;
  protected miseEnEvidence: MiseEnEvidence;
  protected focus: GrilleFocus;

  public constructor(protected listeMotsService: RequeteDeGrilleService) {
=======
export class GrilleComponent extends GrilleAbs implements OnInit {

  public constructor(private listeMotsService: RequeteDeGrilleService,
                     _servicePointage: InfojoueurService) {
    super(_servicePointage);
>>>>>>> abstractionGrille
  }

  public ngOnInit(): void {
  }

<<<<<<< HEAD
  protected remplirPositionLettres(): void {
    for (const mot of this.mots) {
      this.remplirPositionLettresMot(mot);
    }
  }

  protected remplirPositionLettresMot(leMot: Mot): void {
    let tmp: string = this.makeID(leMot.premierX, leMot.premierY, "");
    leMot.positionsLettres = [];
    leMot.positionsLettres[0] = tmp;

    const x: number = leMot.premierX;
    const y: number = leMot.premierY;

    for (let i: number = 1; i < leMot.longueur; i++) {
      leMot.estVertical ? tmp = this.makeID(x, y + i, "") : tmp = this.makeID(x + i, y, "");
      leMot.positionsLettres[i] = tmp;
    }
  }

  protected focusSurBonneLettre(): void {
    this.focus.focusSurBonneLettre(this.motSelectionne);
  }

  protected manageKeyEntry(event: KeyboardEvent): void {
    if (event.key === "Backspace") {
      this.focus.focusOnPreviousLetter(this.motSelectionne, this.lockedLetter);
    } else if (event.key.toUpperCase().charCodeAt(0) >= CONST.KEYCODE_MIN && event.key.toUpperCase().charCodeAt(0) <= CONST.KEYCODE_MAX) {
      this.focusOnNextLetter();
    }
  }

  protected focusOnNextLetter(): void {
    if (this.focus.focusOnNextLetter(this.motSelectionne)) {
      this.validateWord();
    }
  }

  protected validateWord(): void {
    const usersWord: string = this.createWordFromSelectedLetters().toUpperCase();
    const valid: boolean = usersWord === this.motSelectionne.mot;

    if (valid) {
      this.motSelectionne.motTrouve = true;
      this.lockLettersFromWord();
      this.miseEnEvidence.miseEvidenceMot(this.motSelectionne, "green");
      this.focus.removeFocusFromSelectedWord(this.motSelectionne);
      // this._servicePointage.incrementationNbMotDecouv(CONST.INCR_UN_MOT_DECOUVERT);
    }
  }

  protected lockLettersFromWord(): void {
    for (let i: number = 0; i < this.motSelectionne.longueur; i++) {
      if (this.motSelectionne.estVertical) {
        this.lockedLetter[this.motSelectionne.premierX][this.motSelectionne.premierY + i] = true;
      } else {
        this.lockedLetter[this.motSelectionne.premierX + i][this.motSelectionne.premierY] = true;
      }
    }
  }

  protected createWordFromSelectedLetters(): string {
    let wordCreated: string = "";

    for (const elem of this.motSelectionne.positionsLettres) {
      wordCreated += (document.getElementById(elem) as HTMLInputElement).value;
    }

    return wordCreated;
  }

  protected getListeMots(): Mot[] {
    return this.mots;
  }

  protected getMatrice(): Array<Array<LettreGrille>> {
    return this.matriceDesMotsSurGrille;
  }

  protected opacite(etat: boolean): String {
    return (etat ? "0" : ".3");
  }

  protected makeID(i: number, j: number, k: string): string {
    const a: string = String(i);
    const b: string = String(j);

    return a + b + k;
  }

  protected retrieveWordFromClick(event: KeyboardEvent): void {
    // Erreur de typescript en précisant le type
    // tslint:disable-next-line:no-any
    const target: any = event.target || event.srcElement || event.currentTarget;
    const cordinate: string[] = target.attributes.id.nodeValue.split("");
    const x: number = +cordinate[0];
    const y: number = +cordinate[1];
    const motSousJacent: Mot = this.findWordFromXY(x, y);
    this.motSelectionne = motSousJacent;

    this.envoieMotSelectionne();
  }

  protected findWordFromXY(X: number, Y: number): Mot {
    let motTrouve: Mot;
    for (const mot of this.mots) {
      let other: number;
      let max: number;

      if (!mot.estVertical) {
        other = mot.premierY;
        max = mot.premierX + mot.longueur - 1;
        if (X <= max && Y === other && mot.premierX <= X) {
          motTrouve = mot;
          break;
        }
      } else if (mot.estVertical) {
        other = mot.premierX;
        max = mot.premierY + mot.longueur - 1;
        if (Y <= max && X === other && mot.premierY <= Y) {
          motTrouve = mot;
          break;
        }
      }
    }

    return motTrouve;
  }

  protected envoieMotSelectionne(): void {
    this.listeMotsService.serviceEnvoieMotSelectionne(this.motSelectionne);
  }
  protected switchCheatMode(): void {
=======
  protected envoieMotSelectionne(): void {
    this.listeMotsService.serviceEnvoieMotSelectionne(this.motSelectionne);
  }

  public switchCheatMode(): void {
>>>>>>> abstractionGrille
    for (const mot of this.mots) {
      mot.cheat = !mot.cheat;
    }
    this.listeMotsService.serviceEnvoieMots(this.mots);
  }
<<<<<<< HEAD

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
    this.subscriptionMotSelec.unsubscribe();
  }
  protected afficherRegle(): void {
    alert(REGLE_JEU);
  }
=======
>>>>>>> abstractionGrille
}
