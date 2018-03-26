import { Component, OnInit } from "@angular/core";
import { ServiceInteractionComponent } from "../../service-interaction-component/service-interaction-component";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "../librairieGrille/encadrementCase";
import { GrilleAbs } from "../grilleAbs";
import { SocketService } from "../../service-socket/service-socket";
import { PaquetPartie } from "../../objetsTest/paquetPartie";
import { Mot } from "../../objetsTest/mot";
import { LettreGrille } from "../../objetsTest/lettreGrille";
import { TAILLE_TABLEAU } from "../../constantes";
import { OpaciteCase } from "./../librairieGrille/opaciteCase";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";

const CASE_NOIR: LettreGrille = { caseDecouverte: false, lettre: "1", lettreDecouverte: false };
const COULEUR_J2: string = "rgb(132, 112, 255)";
const COULEUR_J1: string = "rgb(233, 128, 116)";

@Component({
  selector: "app-grille-multi",
  templateUrl: "../solo/grille.component.html",
  styleUrls: ["../solo/grille.component.css"]
})

export class GrilleMultijoueurComponent extends GrilleAbs implements OnInit {

  private motSelectJoeur2: Mot;

  public constructor(_servicePointage: InfojoueurService,
                     private serviceSocket: SocketService,
                     private serviceInteraction: ServiceInteractionComponent) {
    super(_servicePointage);
    this.serviceSocket.commencerPartie();
    this.genererGrille();
  }

  public ngOnInit(): void {
    this.mots = this.serviceInteraction.mots;
    this.subscriptionMatrice = new Subscription();
    this.inscriptionChangementMotsGrille();
    this.changerMotSelectDef();
    this.inscriptionChangementMotSelectDef();
    this.inscriptionMonMotSelect();
    this.inscriptionMotSelecetionneJ2();
    this.inscriptionMotTrouve();
    this.inscriptionMotPerdu();
    this.chargerGrille();
    this.finPartie();
  }

  private inscriptionChangementMotsGrille(): void {
    this.subscriptionMots = this.serviceInteraction.serviceReceptionMots().subscribe((mots) => {
      this.mots = mots;
      this.remplirPositionLettres();
    });
  }

  private inscriptionChangementMotSelectDef(): void {
    this.subscriptionMotSelec = this.serviceInteraction.serviceReceptionMotSelectionne()
      .subscribe((motSelec) => {
        this.motSelectionne = motSelec;
        if (this.motSelectionne != null) {
          this.serviceSocket.envoyerMotSelectFromDef(this.motSelectionne);
        }
        this.procedureCommune();
      });
  }

  private changerMotSelectDef(): void {
    this.serviceSocket.recevoirMotDef().subscribe((motSelect: Mot) => {
      OpaciteCase.decouvrirCases(motSelect, this.matriceDesMotsSurGrille);
      this.motSelectionne = this.retrouverMot(motSelect);
      this.motSelectionne.activer = true;
      this.procedureCommune();

    });
  }

  private procedureCommune(): void {
    EncadrementCase.appliquerStyleDefautGrille(document);
    if (this.motSelectJoeur2 != null) {
      this.miseEnEvidence.miseEvidenceMot(this.motSelectJoeur2, "blue");
    }
    if (!this.motSelectionne.motTrouve) {
      this.miseEnEvidence.miseEvidenceMot(this.motSelectionne, "red");
      if (document.getElementById("00") !== null) {
        this.focusSurBonneLettre();
      }
    }
  }

  private genererGrille(): void {
    this.matriceDesMotsSurGrille = new Array<Array<LettreGrille>>();
    for (let i: number = 0; i < TAILLE_TABLEAU; i++) {
      this.matriceDesMotsSurGrille.push(new Array<LettreGrille>(TAILLE_TABLEAU));
      for (let j: number = 0; j < TAILLE_TABLEAU; j++) {
        this.matriceDesMotsSurGrille[i][j] = CASE_NOIR;
      }
    }
  }

  protected envoieMotSelectionne(mot: Mot): void {
    this.serviceInteraction.serviceEnvoieMotSelectionne(mot);
  }

  public switchCheatMode(): void {
    for (const mot of this.mots) {
      mot.cheat = !mot.cheat;
    }
    this.serviceInteraction.serviceEnvoieMots(this.mots);
  }

  public enleverSelection(x: string, y: string): void {
    EncadrementCase.appliquerStyleDefautGrille(document);
    super.remettreCasseOpaque();

  }

  private obtenirLettre(objMot: Mot, indice: number): LettreGrille {
    return {
      caseDecouverte: false,
      lettre: objMot.mot[indice],
      lettreDecouverte: false
    };
  }

  private assignerLettre(objMot: Mot, indice: number): void {
    objMot.estVertical
      ? this.matriceDesMotsSurGrille[objMot.premierX][indice + objMot.premierY] = this.obtenirLettre(objMot, indice)
      : this.matriceDesMotsSurGrille[indice + objMot.premierX][objMot.premierY] = this.obtenirLettre(objMot, indice);
  }

  public insererMotsDansGrille(): void {
    for (const objMot of this.mots) {
      for (let indice: number = 0; indice < objMot.longueur; indice++) {
        this.assignerLettre(objMot, indice);
      }
    }
  }

  protected validateWord(): void {
    const usersWord: string = this.createWordFromSelectedLetters();
    const valid: boolean = usersWord.toLowerCase() === this.motSelectionne.mot.toLowerCase();

    if (valid) {
      this.serviceSocket.envoyerTentative(this.motSelectionne);
      this.motSelectionne.motTrouve = true;
      this.bloquerMot(this.motSelectionne, "rgb(233, 128, 116)");
    }
  }

  private bloquerMot(motABloquer: Mot, couleur: string): void {
    this.bloquerLettreSurMatrice(motABloquer);
    this.miseEnEvidence.miseEvidenceMot(motABloquer, couleur);
    if (this.motSelectionne === this.motSelectJoeur2) {
      this.focus.removeFocusFromSelectedWord(this.retrouverMot(motABloquer));
    }
    this.retrouverMot(motABloquer).motTrouve = true;
    this.remplirMotTrouve(motABloquer, couleur);
  }

  protected bloquerLettreSurMatrice(motABloquer: Mot): void {
    for (let i: number = 0; i < motABloquer.longueur; i++) {
      if (motABloquer.estVertical) {
        this.lockedLetter[motABloquer.premierX][motABloquer.premierY + i] = true;
      } else {
        this.lockedLetter[motABloquer.premierX + i][motABloquer.premierY] = true;
      }
    }
  }

  private remplirMotTrouve(mot: Mot, couleur: string): void {
    let idCase: string;
    for (let i: number = 0; i < mot.longueur; i++) {
      if (mot.estVertical) {
        idCase = mot.premierX.toString() + (mot.premierY + i).toString();
        document.getElementById(idCase).value = mot.mot[i];
      } else {
        idCase = (mot.premierX + i).toString() + mot.premierY.toString();
        document.getElementById(idCase).value = mot.mot[i];
      }
      this.croisementDesCases(mot, idCase, couleur);
    }
  }

  private croisementDesCases(mot: Mot, idCase: string, couleur: string): void {
    let styleInput: string;
    styleInput = document.getElementById(idCase).style.backgroundColor;
    document.getElementById(idCase).style.backgroundColor = couleur;
    if (mot.estVertical) {
      if (this.verifCroisementAutreJoueur(styleInput, couleur)) {
        this.affihcerCasePartagee(idCase + "c");
      }
    } else {
      if (this.verifCroisementAutreJoueur(styleInput, couleur)) {
        this.affihcerCasePartagee(idCase + "c");
      }
    }
  }

  private verifCroisementAutreJoueur(styleInput: string, couleur: string): boolean {
    return styleInput === COULEUR_J2 && couleur !== styleInput ||
      styleInput === COULEUR_J1 && couleur !== styleInput;
  }

  private affihcerCasePartagee(idCase: string): void {
    document.getElementById(idCase).style.backgroundColor = COULEUR_J1;
    document.getElementById(idCase).src = "../../../assets/hachure.png";
  }

  private chargerGrille(): void {
    this.serviceSocket.telechargerPaquetPartie().subscribe((paquet: PaquetPartie) => {
      this.mots = paquet.grilleDeJeu;
      this.serviceInteraction.serviceEnvoieMots(this.mots);
      this.serviceInteraction.souscrireServiceSocket();
      this.insererMotsDansGrille();
    });
  }

  protected retrieveWordFromClick(event: KeyboardEvent): Mot {
    const mot: Mot = super.retrieveWordFromClick(event);
    if (!mot.motTrouve) {
      this.serviceSocket.envoyerMotSelect(mot);
    }

    return mot;
  }

  private inscriptionMonMotSelect(): void {
    this.serviceSocket.recevoirMotSelect().subscribe((mot: Mot) => {
      OpaciteCase.decouvrirCases(mot, this.matriceDesMotsSurGrille);
      this.motSelectionne = this.retrouverMot(mot);
      this.motSelectionne.activer = true;
      this.envoieMotSelectionne(this.motSelectionne);
    });
  }

  private inscriptionMotSelecetionneJ2(): void {
    this.serviceSocket.recevoirMotSelectJ2().subscribe((motJ2: Mot) => {
      this.motSelectJoeur2 = this.retrouverMot(motJ2);
      EncadrementCase.appliquerStyleDefautGrille(document);
      this.miseEnEvidence.miseEvidenceMot(this.motSelectJoeur2, "blue");
      if (this.motSelectionne != null) {
        this.miseEnEvidence.miseEvidenceMot(this.motSelectionne, "red");
      }
    });
  }

  private inscriptionMotTrouve(): void {
    this.serviceSocket.recevoirMotTrouve().subscribe((motTrouve: Mot) => {
      this.bloquerMot(motTrouve, "rgb(233, 128, 116)");
      this.serviceInteraction.serviceEnvoieMotTrouve(motTrouve);
    });
  }

  private inscriptionMotPerdu(): void {
    this.serviceSocket.recevoirMotPerdu().subscribe((motPerdu: Mot) => {
      this.bloquerMot(motPerdu, "rgb(132, 112, 255)");
      this.serviceInteraction.serviceEnvoieMotPerdu(motPerdu);
    });
  }

  private retrouverMot(motSocket: Mot): Mot {
    for (const mot of this.mots) {
      if (mot.mot.toLowerCase() === motSocket.mot.toLowerCase()) {
        return mot;
      }
    }

    return undefined;
  }

  private finPartie(): void {
    this.serviceSocket.finPartie().subscribe( (resultat: string) => {
      document.getElementById("appFinPartie").classList.remove("pasVisible");
      document.getElementById("appFinPartie").classList.add("visible");
      document.getElementById("message").innerHTML = resultat + "!\n";
    });
  }

  private rejouerPartie(): void {
    document.getElementById("appFinPartie").classList.remove("visible");
    document.getElementById("appFinPartie").classList.add("pasVisible");
    this.mots = [];
    this.serviceInteraction.serviceEnvoieMots(this.mots);
    this.genererGrille();
  }

  protected envoyerMotTrouve(mot: Mot): void {
    return;
  }
}
