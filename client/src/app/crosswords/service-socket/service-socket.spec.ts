import { SocketService } from "./service-socket";
import * as socketIo from "socket.io-client";
import { Router } from "@angular/router";
import { SERVER_URL } from "../../../../../common/communication/Server";

describe("ServiceSocketService", () => {
    // On veut utiliser let afin de ne pas l'initialser
    // tslint:disable-next-line:prefer-const
    let mockRouter: Router;
    let service: SocketService;

    beforeEach(() => {
        service = new SocketService(mockRouter);
        service["socketClient"] = socketIo(SERVER_URL);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("Le client devrait emettre des evenements", () => {
        spyOn(service["socketClient"], "emit");
        service.joueurVeutJoindre("1");
        expect(service["socketClient"].emit).toHaveBeenCalled();
    });

    it("Le client devrait emettre des evenements", () => {
        spyOn(service["socketClient"], "emit");
        service.joueurVeutJoindre("nomSalle");
        expect(service["socketClient"].emit).toHaveBeenCalled();
    });

    it("Le client devrait emettre des evenements", () => {
        spyOn(service["socketClient"], "emit");
        service.envoyerGrille([]);
        expect(service["socketClient"].emit).toHaveBeenCalled();
    });

    it("Le client devrait emettre des evenements", () => {
        spyOn(service["socketClient"], "emit");
        service.commencerPartie();
        expect(service["socketClient"].emit).toHaveBeenCalled();
    });

    it("Le client devrait emettre des evenements", () => {
        spyOn(service["socketClient"], "emit");
        service.rejouerPartie();
        expect(service["socketClient"].emit).toHaveBeenCalled();
    });

});
