import { TestBed, inject } from "@angular/core/testing";
import { HttpeReqService } from "./http-request.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("HttpRequestService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [HttpeReqService]
    });
  });

  it("should be created", inject([HttpeReqService], (service: HttpeReqService) => {
    expect(service).toBeTruthy();
  }));
});
