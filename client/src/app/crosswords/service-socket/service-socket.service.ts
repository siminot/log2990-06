import { Injectable } from "@angular/core";
import * as socketIo from "socket.io-client";

const SERVER_URL: string = "http://localhost:3000/";
@Injectable()
export class ServiceSocketService {

  private socket: any;

  public constructor() {
    this.socket = socketIo(SERVER_URL);
    console.log("bonjour");
  }

}
