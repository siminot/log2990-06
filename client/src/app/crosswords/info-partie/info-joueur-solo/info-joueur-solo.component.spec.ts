import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InfoJoueurSoloComponent } from "./info-joueur-solo.component";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { ServiceInteractionComponent } from "../../service-interaction-component/service-interaction-component";
import { ServiceHttp } from "../../serviceHttp/http-request.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import * as CONST from "../../constantes";
import { Router } from "@angular/router";

describe("InfoJoueurSoloComponent", () => {
  let component: InfoJoueurSoloComponent;
  let fixture: ComponentFixture<InfoJoueurSoloComponent>;
  // On veut utiliser let afin de ne pas l'initialser
  // tslint:disable-next-line:prefer-const
  let mockRouter: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ InfojoueurService, ServiceInteractionComponent, ServiceHttp, { provide: Router, useValue: mockRouter } ],
      declarations: [ InfoJoueurSoloComponent ]
    })
    .compileComponents()
    .catch(() => { throw new Error("Erreur de la creation du test"); });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoJoueurSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

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
