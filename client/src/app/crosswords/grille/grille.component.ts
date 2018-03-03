import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core/src/metadata/lifecycle_hooks";
import { Mot, LettreGrille } from "../objetsTest/mot";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";
import * as CONST from "../constantes";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "./encadrementCase";

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
  // private positionLettresSelectionnees: string[];
  private positionCourante: number;
  private lockedLetter: boolean[][];

  private subscriptionMots: Subscription;
  private subscriptionMatrice: Subscription;
  private subscriptionMotSelec: Subscription;
  // private focusTest: GrilleFocus;

  public constructor(private listeMotsService: RequeteDeGrilleService,
                     private _servicePointage: InfojoueurService) {
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
    this.remplirPositionLettres();
    this.matriceDesMotsSurGrille = this.listeMotsService.matrice;
    this.subscriptionMots = this.listeMotsService.serviceReceptionMots().subscribe((mots) => {this.mots = mots; });
    this.subscriptionMatrice = this.listeMotsService.serviceReceptionMatriceLettres()
    .subscribe((matrice) => this.matriceDesMotsSurGrille = matrice);
    this.subscriptionMotSelec = this.listeMotsService.serviceReceptionMotSelectionne()
      .subscribe((motSelec) => {
        this.motSelectionne = motSelec;
        this.motSelectionne.mot = this.motSelectionne.mot.toUpperCase();
        EncadrementCase.appliquerStyleDefautGrille(document);

        if (!this.motSelectionne.motTrouve) {
          this.miseEvidenceMot("red");
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
    // this.positionLettresSelectionnees = [];

    let tmp: string = this.makeID(leMot.premierX, leMot.premierY, "");
    leMot.positionsLettres[0] = tmp;

    console.log("LIGNE BIDON");

    const x: number = leMot.premierX;
    const y: number = leMot.premierY;

    for (let i: number = 1 ; i < leMot.longeur ; i++) {
      leMot.estVertical ? tmp = this.makeID(x, y + i, "") : tmp = this.makeID(x + i, y, "");
      leMot.positionsLettres[i] = tmp;
    }
  }

  private miseEvidenceMot(couleur: string): void {
    let uneCase: HTMLElement, idTmp: string, n: number;

    for (let i: number = 0 ; i < this.motSelectionne.longeur ; i++) {
      idTmp = this.motSelectionne.positionsLettres[i];
      n = +idTmp[0] * CONST.DIZAINE + +idTmp[1];
      uneCase = document.getElementsByTagName("td")[n];
      this.miseEvidenceLettre(uneCase, i, couleur);
    }
  }

  private miseEvidenceLettre(uneCase: HTMLElement, position: number, couleur: string): void {
    if (!this.motSelectionne.estVertical) {
      this.miseEvidenceLettreNonVerticale(uneCase, position, couleur);
    } else {
      this.miseEvidenceLettreVericale(uneCase, position, couleur);
    }
  }

  private miseEvidenceLettreNonVerticale(uneCase: HTMLElement, position: number, couleur: string): void {
    if (position === 0) {
      EncadrementCase.appliquerBordureHaut(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
    } else if (position === this.motSelectionne.longeur - 1) {
      EncadrementCase.appliquerBordureBas(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
    }
    EncadrementCase.appliquerBordureGauche(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
    EncadrementCase.appliquerBordureDroite(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
  }

  private miseEvidenceLettreVericale(uneCase: HTMLElement, position: number, couleur: string): void {
    if (position === 0) {
      EncadrementCase.appliquerBordureGauche(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
    } else if (position === this.motSelectionne.longeur - 1) {
      EncadrementCase.appliquerBordureDroite(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
    }
    EncadrementCase.appliquerBordureHaut(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
    EncadrementCase.appliquerBordureBas(uneCase, couleur, CONST.LARGEUR_BORDURE_CASE_CIBLE);
  }

  private focusSurBonneLettre(): void {
    let elemTmp: HTMLInputElement, idTmp: string;
    let i: number;

    for (i = 0 ; i < this.motSelectionne.longeur ; i++) {
      idTmp = this.motSelectionne.positionsLettres[i];
      elemTmp = document.getElementById(idTmp) as HTMLInputElement;

      if (elemTmp.value === "") {
        this.positionCourante = i;
        elemTmp.focus();

        return;
      }
    }

    this.positionCourante = this.motSelectionne.longeur - 1;
    elemTmp.focus();
  }

  public manageKeyEntry(event: KeyboardEvent): void {
    if (event.key === "Backspace") {
      this.focusOnPreviousLetter();
    } else if (event.key.toUpperCase().charCodeAt(0) >= CONST.KEYCODE_MIN && event.key.toUpperCase().charCodeAt(0) <= CONST.KEYCODE_MAX) {
      this.focusOnNextLetter();
    }
  }

  private focusOnNextLetter(): void {
    if (this.positionCourante < this.motSelectionne.longeur - 1) {
      this.positionCourante++;
      const elem: HTMLInputElement =
      document.getElementById(this.motSelectionne.positionsLettres[this.positionCourante]) as HTMLInputElement;
      if (elem !== null) {
        elem.focus();

        if (elem.value !== "") {
          this.focusOnNextLetter();
        }
      }

    } else if (this.positionCourante === this.motSelectionne.longeur - 1) {
      this.validateWord();
    }
  }

  private validateWord(): boolean {
    const usersWord: string = this.createWordFromSelectedLetters().toUpperCase();
    const valid: boolean = usersWord === this.motSelectionne.mot;

    if (valid) {
      this.motSelectionne.motTrouve = true;
      this.lockLettersFromWord();
      this.miseEvidenceMot("green");
      this.removeFocusFromSelectedWord();
      this._servicePointage.incrementationNbMotDecouv(CONST.INCR_UN_MOT_DECOUVERT);
    }

    return valid;
  }

  private removeFocusFromSelectedWord(): void {
    const elem: HTMLInputElement = document.getElementById(this.motSelectionne.positionsLettres[this.positionCourante]) as HTMLInputElement;
    elem.blur();
  }

  private lockLettersFromWord(): void {
    for (let i: number = 0 ; i < this.motSelectionne.longeur ; i++) {
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

  private focusOnPreviousLetter(): void {
    const idCourant: string = this.motSelectionne.positionsLettres[this.positionCourante];
    const elemCourant: HTMLInputElement = document.getElementById(idCourant) as HTMLInputElement;
    const xCour: number = +this.motSelectionne.positionsLettres[this.positionCourante][0];
    const yCour: number = +this.motSelectionne.positionsLettres[this.positionCourante][1];

    if (this.isLastLetterOfWord(elemCourant) && !this.lockedLetter[xCour][yCour] && elemCourant.value !== "") {
      elemCourant.value = "";
    } else if (this.positionCourante > 0 || (this.isLastLetterOfWord(elemCourant) && this.lockedLetter[xCour][yCour])) {
      this.positionCourante--;
      const idPrev: string = this.motSelectionne.positionsLettres[this.positionCourante];
      const previousElem: HTMLInputElement = document.getElementById(idPrev) as HTMLInputElement;
      const xPrev: number = +this.motSelectionne.positionsLettres[this.positionCourante][0];
      const yPrev: number = +this.motSelectionne.positionsLettres[this.positionCourante][1];

      if (previousElem !== null) {
        if (!this.lockedLetter[xPrev][yPrev]) {
          previousElem.focus();
          previousElem.value = "";
        } else {
          this.focusOnPreviousLetter();
        }
      }
    }
  }

  private isLastLetterOfWord(elemCourant: HTMLInputElement): boolean {
    return this.positionCourante === this.motSelectionne.longeur - 1 ? true : false;
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
    // retrieve Id from the event
    // Erreur de typescript en précisant le type
    // tslint:disable-next-line:no-any
    const target: any = event.target || event.srcElement || event.currentTarget;
    const cordinate: string[] = target.attributes.id.nodeValue.split("");
    // coordonne X et Y de la case selectionneMot
    const x: number = +cordinate[0];
    const y: number = +cordinate[1];
    const motSousJacent: Mot = this.findWordFromXY(x, y);
    this.motSelectionne = motSousJacent;

    this.envoieMotSelectionne();
    // this.focusOnRightLetter();
  }

  private findWordFromXY( X: number, Y: number): Mot {
    let motTrouve: Mot;
    for (const mot of  this.mots) {
      let other: number;
      let max: number;

      if (!mot.estVertical) {
        other = mot.premierY;
        max = mot.premierX + mot.longeur - 1;
        if ( X <= max && Y === other && mot.premierX <= X) {
          motTrouve = mot;
          break;
        }
      } else if ( mot.estVertical) {
        other = mot.premierX;
        max = mot.premierY + mot.longeur - 1;
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
  // never reasign ? On change un attribut juste en dessous, du calme TSlint
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
