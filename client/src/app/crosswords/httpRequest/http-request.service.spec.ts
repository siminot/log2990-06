import { TestBed, inject } from "@angular/core/testing";
import { HttpClient} from "@angular/common/http";
import { HttpeReqService } from "./http-request.service";

describe("HttpRequestService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpeReqService]
    });
  });

  it("should be created", inject([HttpClient], (service: HttpeReqService) => {
    expect(service).toBeTruthy();
  }));
});
