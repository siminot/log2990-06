import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InfoJoueur1Component } from "./info-joueur1.component";
import { InfojoueurService } from "../service-info-joueur/infojoueur.service";

describe("InfoJoueur1Component", () => {
  let component: InfoJoueur1Component;
  let fixture: ComponentFixture<InfoJoueur1Component>;
  let infojoueur: InfojoueurService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ InfojoueurService ],
      declarations: [ InfoJoueur1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoJoueur1Component);
    component = fixture.componentInstance;
    infojoueur = new InfojoueurService();
    component = new InfoJoueur1Component(infojoueur);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
