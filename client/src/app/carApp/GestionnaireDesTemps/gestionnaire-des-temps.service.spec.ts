import { TestBed, inject } from "@angular/core/testing";
import { GestionnaireDesTempsService } from "./gestionnaire-des-temps.service";
import { TimerService } from "../timer/timer.service";
import { InvalidArgumentError } from "../../exceptions/invalidArgumentError";

const TEMPSTEST: number = 12345;

class MockTimer {

    private tempsTest: number = TEMPSTEST;

    public get nouveauTour(): number { return this.tempsTest; }
    public get obtenirTempsActuel(): number { return this.tempsTest; }
    public get obtenirTempsTourJoueur(): number { return this.tempsTest; }

}

describe("GestionnaireDesTempsService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GestionnaireDesTempsService,
                        { provide: TimerService, useClass: MockTimer }]
        });
    });

    it("Devrait bien construire", inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
        expect(service).toBeTruthy();
    }));

    describe("Actualisation du temps de course course", () => {

        it("Devrait changer le temps de la course pour le premier AI",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            //
        }));

        it("Devrait changer le temps de la course pour le deuxieme AI",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            //
        }));

        it("Devrait changer le temps de la course pour le troisieme AI",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            //
        }));

        it("Devrait lancer une erreur",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            expect( () => { service.AIXCourseComplete(3); }).toThrow(new InvalidArgumentError());
        }));

        it("Devrait lancer une erreur",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            expect( () => { service.AIXCourseComplete(-10); }).toThrow(new InvalidArgumentError());
        }));

    });

    describe("Ajout de temps de tour", () => {

        it("Devrait changer le temps de la course pour le premier AI",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
               //
        }));

        it("Devrait lancer une erreur",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            expect( () => { service.AIxTourComplete(3); }).toThrow(new InvalidArgumentError());
        }));

        it("Devrait lancer une erreur",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            expect( () => { service.AIxTourComplete(-10); }).toThrow(new InvalidArgumentError());
        }));

    });

    // Prototype de test
    // it("", inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {

    // }));

});
