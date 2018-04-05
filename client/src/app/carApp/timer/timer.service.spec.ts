import { TestBed, inject } from "@angular/core/testing";
import { TimerService } from "./timer.service";

describe("TimerService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TimerService]
        });
    });

    const serviceTimer: TimerService = new TimerService();

    it("Devrait etre construit", inject([TimerService], (service: TimerService) => {
        expect(service).toBeTruthy();
    }));

    describe("Avant d'avoir debute le timer", () => {
        it("Temps actuel devrait être à 0", () => {
            expect(serviceTimer.obtenirTempsActuel).toEqual(0);
        });
        it("Temps dernier tour devrait être à 0", () => {
            expect(serviceTimer.obtenirTempsActuel).toEqual(0);
        });
    });

});
