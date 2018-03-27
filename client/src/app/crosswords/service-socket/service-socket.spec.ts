import { TestBed, inject } from "@angular/core/testing";

import { SocketService } from "./service-socket";
import { Router } from "@angular/router";

describe("ServiceSocketService", () => {
  // On veut utiliser let afin de ne pas l'initialser
  // tslint:disable-next-line:prefer-const
  let mockRouter: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService, { provide: Router, useValue: mockRouter }]
    });
  });

  it("should be created", inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));
});
