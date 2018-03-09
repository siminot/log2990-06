import { TestBed, inject } from "@angular/core/testing";

import { ServiceSocketService } from "./service-socket.service";

describe("ServiceSocketService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceSocketService]
    });
  });

  it("should be created", inject([ServiceSocketService], (service: ServiceSocketService) => {
    expect(service).toBeTruthy();
  }));
});
