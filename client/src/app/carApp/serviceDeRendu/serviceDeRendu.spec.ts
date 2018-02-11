import { TestBed, inject } from "@angular/core/testing";

import { ServiceDeRendu } from "./serviceDeRendu";

describe("ServiceDeRendu", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ServiceDeRendu]
        });
    });

    it("should be created", inject([ServiceDeRendu], (service: ServiceDeRendu) => {
        expect(service).toBeTruthy();
    }));
});
