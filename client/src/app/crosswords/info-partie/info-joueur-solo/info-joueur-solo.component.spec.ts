import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";

import { InfoJoueurSoloComponent } from "./info-joueur-solo.component";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { RequeteDeGrilleService } from "../../service-Requete-de-Grille/requete-de-grille.service";
import { HttpeReqService } from "../../httpRequest/http-request.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import * as CONST from "../../constantes";

describe("InfoJoueur1Component", () => {
  let component: InfoJoueurSoloComponent;
  let fixture: ComponentFixture<InfoJoueurSoloComponent>;
  let infojoueur: InfojoueurService;
  let serviceGrille: RequeteDeGrilleService;
  let serviceHttp: HttpeReqService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ InfojoueurService, RequeteDeGrilleService, HttpeReqService ],
      declarations: [ InfoJoueurSoloComponent ]
    })
    .compileComponents()
    .catch(() => { throw new Error("Erreur de la creation du test"); });
  }));

  beforeEach(inject([HttpeReqService], (service: HttpeReqService) => {
    serviceHttp = service;
    serviceGrille = new RequeteDeGrilleService(serviceHttp);
    fixture = TestBed.createComponent(InfoJoueurSoloComponent);
    component = fixture.componentInstance;
    infojoueur = new InfojoueurService();
    component = new InfoJoueurSoloComponent(infojoueur, serviceGrille, serviceHttp);
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Formatage du timer", () => {
    const formatedTimer: string = "0" + CONST.ABREVIATION_HEURES +
                                  "0" + CONST.ABREVIATION_MINUTES +
                                  "0" + CONST.ABREVIATION_SECONDES;
    component["_timer"] = 0;
    component.formatterTimer();
    expect(component["_formatedTimer"]).toEqual(formatedTimer);
  });
});
