import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MainGrilleComponent } from "./main-grille.component";

describe("MainGrilleComponent", () => {
  let component: MainGrilleComponent;
  let fixture: ComponentFixture<MainGrilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGrilleComponent ]
    })
    .compileComponents()
    .catch(() => { throw new Error("Erreur de la creation du test"); });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
