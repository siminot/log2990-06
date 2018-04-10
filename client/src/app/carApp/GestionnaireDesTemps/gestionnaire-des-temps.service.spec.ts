import { TestBed, inject } from "@angular/core/testing";

import { GestionnaireDesTempsService } from "./gestionnaire-des-temps.service";

describe("GestionnaireDesTempsService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionnaireDesTempsService]
    });
  });

  it("should be created", inject([GestionnaireDesTempsService], (service: GestionnaireDesTempsService) => {
    expect(service).toBeTruthy();
  }));
});
