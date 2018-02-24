import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoJoueur1Component } from './info-joueur1.component';

describe('InfoJoueur1Component', () => {
  let component: InfoJoueur1Component;
  let fixture: ComponentFixture<InfoJoueur1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoJoueur1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoJoueur1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
