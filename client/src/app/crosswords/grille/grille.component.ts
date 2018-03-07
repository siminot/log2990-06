import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { Mot } from "../objetsTest/mot";
import { LettreGrille } from "../objetsTest/lettreGrille";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import * as CONST from "../constantes";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "./encadrementCase";
import { MiseEnEvidence } from "./miseEnEvidence";
import { GrilleFocus } from "./grilleFocus";

const REGLE_JEU: string = "Cliquez sur une définition afin d'effectuer une tentative.";
@Component({
  selector: "app-grille",
  templateUrl: "./grille.component.html",
  styleUrls: ["./grille.component.css"]
})

export class GrilleComponent implements OnInit, OnDestroy {
  private mots: Mot[];
  private matriceDesMotsSurGrille: Array<Array<LettreGrille>>;
  private motSelectionne: Mot;
  private lockedLetter: boolean[][];

  private subscriptionMots: Subscription;
  private subscriptionMatrice: Subscription;
  private subscriptionMotSelec: Subscription;
  private miseEnEvidence: MiseEnEvidence;
  private focus: GrilleFocus;

  public constructor(private listeMotsService: RequeteDeGrilleService,
                     private _servicePointage: InfojoueurService) {
    this.miseEnEvidence = new MiseEnEvidence();
    this.focus = new GrilleFocus(document, 0);
    this.lockedLetter = [];
    for (let i: number = 0 ; i < CONST.TAILLE_TABLEAU ; i++) {
      this.lockedLetter[i] = [];
      for (let j: number = 0 ; j < CONST.TAILLE_TABLEAU ; j++) {
        this.lockedLetter[i][j] = false;
      }
    }
  }

  public ngOnInit(): void {
    this.mots = this.listeMotsService.mots;
    this.matriceDesMotsSurGrille = this.listeMotsService.matrice;
    // this.remplirPositionLettres(); // JUSTE POUR LA GRILLE DE TEST
    this.subscriptionMots = this.listeMotsService.serviceReceptionMots().subscribe((mots) => {
        this.mots = mots;
        this.remplirPositionLettres(); });
    this.subscriptionMatrice = this.listeMotsService.serviceReceptionMatriceLettres()
    .subscribe((matrice) => this.matriceDesMotsSurGrille = matrice);
    this.subscriptionMotSelec = this.listeMotsService.serviceReceptionMotSelectionne()
      .subscribe((motSelec) => {
        this.motSelectionne = motSelec;
        this.motSelectionne.mot = this.motSelectionne.mot.toUpperCase();
        EncadrementCase.appliquerStyleDefautGrille(document);

        if (!this.motSelectionne.motTrouve) {
          this.miseEnEvidence.miseEvidenceMot(this.motSelectionne, "red");
          if (document.getElementById("00") !== null) {
            this.focusSurBonneLettre();
          }
        }
      });
  }

  private remplirPositionLettres(): void {
    for (const mot of this.mots) {
      this.remplirPositionLettresMot(mot);
    }
  }

  private remplirPositionLettresMot(leMot: Mot): void {
    let tmp: string = this.makeID(leMot.premierX, leMot.premierY, "");
    leMot.positionsLettres = [];
    leMot.positionsLettres[0] = tmp;

    const x: number = leMot.premierX;
    const y: number = leMot.premierY;

    for (let i: number = 1 ; i < leMot.longueur ; i++) {
      leMot.estVertical ? tmp = this.makeID(x, y + i, "") : tmp = this.makeID(x + i, y, "");
      leMot.positionsLettres[i] = tmp;
    }
  }

  private focusSurBonneLettre(): void {
    this.focus.focusSurBonneLettre(this.motSelectionne);
  }

  public manageKeyEntry(event: KeyboardEvent): void {
    if (event.key === "Backspace") {
      this.focus.focusOnPreviousLetter(this.motSelectionne, this.lockedLetter);
    } else if (event.key.toUpperCase().charCodeAt(0) >= CONST.KEYCODE_MIN && event.key.toUpperCase().charCodeAt(0) <= CONST.KEYCODE_MAX) {
      this.focusOnNextLetter();
    }
  }

  private focusOnNextLetter(): void {
    if (this.focus.focusOnNextLetter(this.motSelectionne)) {
      this.validateWord();
    }
  }

  private validateWord(): void {
    const usersWord: string = this.createWordFromSelectedLetters().toUpperCase();
    const valid: boolean = usersWord === this.motSelectionne.mot;

    if (valid) {
      this.motSelectionne.motTrouve = true;
      this.lockLettersFromWord();
      this.miseEnEvidence.miseEvidenceMot(this.motSelectionne, "green");
      this.focus.removeFocusFromSelectedWord(this.motSelectionne);
      this._servicePointage.incrementationNbMotDecouv(CONST.INCR_UN_MOT_DECOUVERT);
    }
  }

  private lockLettersFromWord(): void {
    for (let i: number = 0 ; i < this.motSelectionne.longueur ; i++) {
      if (this.motSelectionne.estVertical) {
        this.lockedLetter[this.motSelectionne.premierX][this.motSelectionne.premierY + i] = true;
      } else {
        this.lockedLetter[this.motSelectionne.premierX + i][this.motSelectionne.premierY] = true;
      }
    }
  }

  private createWordFromSelectedLetters(): string {
    let wordCreated: string = "";

    for (const elem of this.motSelectionne.positionsLettres) {
      wordCreated += (document.getElementById(elem) as HTMLInputElement).value;
    }

    return wordCreated;
  }

  public getListeMots(): Mot[] {
    return this.mots;
  }

  public getMatrice(): Array<Array<LettreGrille>> {
    return this.matriceDesMotsSurGrille;
  }

  public opacite(etat: boolean): String {
    return(etat ? "0" : ".3");
  }

  private makeID(i: number, j: number, k: string): string {
    const a: string = String(i);
    const b: string = String(j);

    return a + b + k;
  }

  public retrieveWordFromClick(event: KeyboardEvent): void {
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

  private findWordFromXY( X: number, Y: number): Mot {
    let motTrouve: Mot;
    for (const mot of  this.mots) {
      let other: number;
      let max: number;

      if (!mot.estVertical) {
        other = mot.premierY;
        max = mot.premierX + mot.longueur - 1;
        if ( X <= max && Y === other && mot.premierX <= X) {
          motTrouve = mot;
          break;
        }
      } else if ( mot.estVertical) {
        other = mot.premierX;
        max = mot.premierY + mot.longueur - 1;
        if ( Y <= max && X === other && mot.premierY <= Y) {
          motTrouve = mot;
          break;
        }
      }
    }

    return motTrouve;
  }

  private envoieMotSelectionne(): void {
    this.listeMotsService.serviceEnvoieMotSelectionne(this.motSelectionne);
  }
  public switchCheatMode(): void {
    for (const mot of this.mots) {
      mot.cheat = !mot.cheat;
    }
    this.listeMotsService.serviceEnvoieMots(this.mots);
  }

  public ngOnDestroy(): void {
    this.subscriptionMots.unsubscribe();
    this.subscriptionMatrice.unsubscribe();
    this.subscriptionMotSelec.unsubscribe();
  }
  public afficherRegle(): void {
    alert(REGLE_JEU);
  }
}
