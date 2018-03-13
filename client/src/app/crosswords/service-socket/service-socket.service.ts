import { Injectable } from "@angular/core";
import * as socketIo from "socket.io-client";
import * as event from "../../../../../common/communication/evenementSocket";


const SERVER_URL: string = "http://localhost:3000/";
@Injectable()
export class ServiceSocketService {

  private socketClient: any;

  public constructor() {
    this.socketClient = socketIo(SERVER_URL);
    console.log("bonjour");
  }

  public socketRejoindrePartie(): void {
    //
  }

  public socketCreerPartie(): void {
    //
  }

  public joueurVeutJoindre(nomSalle: string): void {
    this.socketClient.emit(event.REJOINDRE, nomSalle);
  }

  public envoieNomSalle(nomSalle: string): void {
    this.socketClient.emit(event.NOM_SALLE);
  }

}
