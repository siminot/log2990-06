import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";

import { InfoJoueur1Component } from "./info-joueur1.component";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";
import { RequeteDeGrilleService } from "../service-Requete-de-Grille/requete-de-grille.service";

describe("InfoJoueur1Component", () => {
  let component: InfoJoueur1Component;
  let fixture: ComponentFixture<InfoJoueur1Component>;
  let infojoueur: InfojoueurService;
  let serviceGrille: RequeteDeGrilleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ InfojoueurService ],
      declarations: [ InfoJoueur1Component ]
    })
    .compileComponents();
  }));

  beforeEach(inject([RequeteDeGrilleService], (service: RequeteDeGrilleService) => {
    serviceGrille = service;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoJoueur1Component);
    component = fixture.componentInstance;
    infojoueur = new InfojoueurService();
    component = new InfoJoueur1Component(infojoueur, serviceGrille);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
