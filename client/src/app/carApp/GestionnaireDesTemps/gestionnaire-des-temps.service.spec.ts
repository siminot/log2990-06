import { TestBed, inject } from "@angular/core/testing";
import { GestionnaireDesTempsService } from "./gestionnaire-des-temps.service";
import { TimerService } from "../timer/timer.service";
import { InvalidArgumentError } from "../../exceptions/invalidArgumentError";

const TEMPSTEST: number = 12345;

class MockTimer {

    private tempsTest: number = TEMPSTEST;

    public nouveauTour(noJoueur: number): number { return this.tempsTest; }
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

    describe("Actualisation du temps de course", () => {

        it("Devrait changer le temps de la course pour le premier AI",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            service.AIXCourseComplete(0);
            expect(service["tempsAIs"][0].obtenirTempsCourse.obtenirTemps).toEqual(TEMPSTEST);
        }));

        it("Devrait changer le temps de la course pour le deuxieme AI",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            service.AIXCourseComplete(1);
            expect(service["tempsAIs"][1].obtenirTempsCourse.obtenirTemps).toEqual(TEMPSTEST);
        }));

        it("Devrait changer le temps de la course pour le troisieme AI",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            service.AIXCourseComplete(2);
            expect(service["tempsAIs"][2].obtenirTempsCourse.obtenirTemps).toEqual(TEMPSTEST);
        }));

        it("Devrait lancer une erreur",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            expect( () => { service.AIXCourseComplete(4); }).toThrow(new InvalidArgumentError());
        }));

        it("Devrait lancer une erreur",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            expect( () => { service.AIXCourseComplete(-10); }).toThrow(new InvalidArgumentError());
        }));

    });

    describe("Ajout de temps de tour", () => {

        it("Devrait changer le temps de la course pour le premier AI",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
               service.AIxTourComplete(0);
               service.AIxTourComplete(0);
               expect(service["tempsAIs"][0].obtenirTempsTours[1].obtenirTemps).toEqual(TEMPSTEST);
        }));

        it("Devrait changer le temps de la course pour le deuxieme AI",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
               service.AIxTourComplete(1);
               service.AIxTourComplete(1);
               service.AIxTourComplete(1);
               expect(service["tempsAIs"][1].obtenirTempsTours[2].obtenirTemps).toEqual(TEMPSTEST);
        }));

        it("le temps des tours pas encore fait sont a 0",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
               service.AIxTourComplete(2);
               expect(service["tempsAIs"][2].obtenirTempsTours[2].obtenirTemps).toEqual(0);
        }));

        it("Devrait lancer une erreur",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            expect( () => { service.AIxTourComplete(4); }).toThrow(new InvalidArgumentError());
        }));

        it("Devrait lancer une erreur",
           inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
            expect( () => { service.AIxTourComplete(-10); }).toThrow(new InvalidArgumentError());
        }));

    });

});
