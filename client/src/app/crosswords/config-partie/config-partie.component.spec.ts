import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { ServiceHttp } from "../serviceHttp/http-request.service";
import { ConfigPartieComponent } from "./config-partie.component";
// import { ProviderAstType } from "@angular/compiler";
import { SocketService } from "../service-socket/service-socket";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Difficulte } from "../../../../../common/communication/IConfigurationPartie";
import { Router } from "@angular/router";

describe("ConfigPartieComponent", () => {
  let component: ConfigPartieComponent;
  let fixture: ComponentFixture<ConfigPartieComponent>;
  let reqService: ServiceHttp;
  let serviceSocket: SocketService;
  let mockRouter: any;

  beforeEach(async(() => {
    mockRouter = jasmine.createSpyObj("Router", ["navigate"]);
    TestBed.configureTestingModule({
      declarations: [ ConfigPartieComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ServiceHttp, { provide: Router, useValue: mockRouter }, SocketService ]

    })

    .compileComponents()

    .catch();
  }));

  beforeEach(inject([ServiceHttp, SocketService, Router],
                    (service: ServiceHttp, servSock: SocketService) => {
      fixture = TestBed.createComponent(ConfigPartieComponent);
      // component = fixture.componentInstance;
      reqService = service;
      serviceSocket = servSock;
      fixture.detectChanges();
      mockRouter = jasmine.createSpyObj("Router", ["navigate"]);
      component = new ConfigPartieComponent(reqService, serviceSocket, mockRouter);

  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ajouterDifficulte()", () => {

    it("devrait mettre a jour la requete", () => {
      component.ajouterDifficulte(Difficulte.Facile);
      expect(component["serviceHTTP"].difficulte).toEqual(Difficulte.Facile);
      component.ajouterDifficulte(Difficulte.Normal);
      expect(component["serviceHTTP"].difficulte).toEqual(Difficulte.Normal);
      component.ajouterDifficulte(Difficulte.Difficile);
      expect(component["serviceHTTP"].difficulte).toEqual(Difficulte.Difficile);
    });

    it("ne devrait pas mettre a jour la requete", () => {
      const DIFFICULTE_AVANT: Difficulte = component["serviceHTTP"].difficulte;
      component.ajouterDifficulte(undefined);
      expect(component["serviceHTTP"].difficulte).toEqual(DIFFICULTE_AVANT);
    });

  });
});
