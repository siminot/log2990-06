import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGrilleComponent } from './main-grille.component';
import { DefinitionComponent } from '../definition/definition.component';

describe('MainGrilleComponent', () => {
  let component: MainGrilleComponent;
  let fixture: ComponentFixture<MainGrilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainGrilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainGrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
