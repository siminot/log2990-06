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

const CASE_NOIR: LettreGrille = { caseDecouverte: false, lettre: "1", lettreDecouverte: false };
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
    this.inscriptionChangementMots();
    this.inscriptionChangementMotSelect();
    this.inscriptionMonMotSelect();
    this.inscriptionMotSelecetionneJ2();
    this.inscriptionMotTrouve();
    this.inscriptionMotPerdu();
    this.chargerGrille();
  }

  private inscriptionChangementMots(): void {
    this.subscriptionMots = this.serviceInteraction.serviceReceptionMots().subscribe((mots) => {
      this.mots = mots;
      this.remplirPositionLettres();
    });
  }

  private inscriptionChangementMotSelect(): void {
    this.subscriptionMotSelec = this.serviceInteraction.serviceReceptionMotSelectionne()
      .subscribe((motSelec) => {
        this.motSelectionne = motSelec;
        this.motSelectionne.mot = this.motSelectionne.mot.toUpperCase();
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
      });
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
    const usersWord: string = this.createWordFromSelectedLetters().toUpperCase();
    const valid: boolean = usersWord === this.motSelectionne.mot;

    if (valid) {
      this.serviceSocket.envoyerTentative(this.motSelectionne);
      this.motSelectionne.motTrouve = true;
      this.bloquerMot(this.motSelectionne, "green");
    }
  }

  private bloquerMot(motABloquer: Mot, couleur: string): void {
    this.bloquerLettreSurMatrice(motABloquer);
    this.miseEnEvidence.miseEvidenceMot(motABloquer, couleur);
    this.focus.removeFocusFromSelectedWord(motABloquer);
    this.retrouverMot(motABloquer).motTrouve = true;
    this.remplirInputsMot(motABloquer);
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

  private remplirInputsMot(mot: Mot): void {
    for (let i: number = 0; i < mot.longueur; i++) {
      mot.estVertical
      ? document.getElementById(mot.premierX.toString() + (mot.premierY + i).toString()).value = mot.mot[i]
      : document.getElementById((mot.premierX + i).toString() + mot.premierY.toString()).value = mot.mot[i];
    }
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
    this.serviceSocket.envoyerMotSelect(mot);

    return mot;
  }

  private inscriptionMonMotSelect(): void {
    this.serviceSocket.recevoirMotSelect().subscribe( (mot: Mot) => {
      OpaciteCase.decouvrirCases(mot, this.matriceDesMotsSurGrille);
      this.motSelectionne = this.retrouverMot(mot);
      this.motSelectionne.activer = true;
      this.envoieMotSelectionne(mot);
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
    this.serviceSocket.recevoirMotTrouve().subscribe( (motTrouve: Mot) => {
      this.bloquerMot(motTrouve, "green");
    });
  }

  private inscriptionMotPerdu(): void {
    this.serviceSocket.recevoirMotPerdu().subscribe( (motPerdu: Mot) => {
      this.bloquerMot(motPerdu, "purple");
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
}
