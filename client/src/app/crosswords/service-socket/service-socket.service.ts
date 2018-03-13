import { Injectable } from "@angular/core";
import * as socketIo from "socket.io-client";
import * as event from "../../../../../common/communication/evenementSocket";

const SERVER_URL: string = "http://localhost:3000/";
@Injectable()
export class ServiceSocketService {

  private socketClient: SocketIOClient.Socket;
  private nomPartie: string;
  private diffPartie: string;

  public constructor() {
    this.socketClient = socketIo(SERVER_URL);
  }

  public socketRejoindrePartie(): void {
    //
  }

  public socketCreerPartie(): void {
    //
  }

  public creerPartie(): void {
      console.log("nom " + this.nomPartie + " diff " + this.diffPartie);
      this.socketClient.emit(event.CREATEUR, this.nomPartie, this.diffPartie);
  }

  public modifierNom(nouveauNomPartie: string): void {
    this.nomPartie = nouveauNomPartie;
  }

  public modifierDifficultee(nouvelleDiff: string): void {
    this.diffPartie = nouvelleDiff;
  }

  public envoyerDiff(difficultee: string): void {
    this.socketClient.emit(event.ENVOYER_DIFF, difficultee);
    this.attenteDeCreationPartie();
  }

  public attenteDeCreationPartie(): void {
    this.socketClient.on(event.DEMANDER_GRILLE, () => {
      console.log("Le serveur attend la grille");
    });
    //
  }

  public joueurVeutJoindre(nomSalle: string): void {
    this.socketClient.emit(event.REJOINDRE, nomSalle);
  }

  // public envoieNomSalle(nomSalle: string): void {
  //   this.socketClient.emit(event.NOM_SALLE);
  // }

}
