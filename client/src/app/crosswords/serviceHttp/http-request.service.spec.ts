import { TestBed, inject } from "@angular/core/testing";
import { ServiceHttp } from "./http-request.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("HttpRequestService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ServiceHttp]
    });
  });

  it("should be created", inject([ServiceHttp], (service: ServiceHttp) => {
    expect(service).toBeTruthy();
  }));
});
