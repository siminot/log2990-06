import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiJoueurGenererComponent } from './multi-joueur-generer.component';

describe('MultiJoueurGenererComponent', () => {
  let component: MultiJoueurGenererComponent;
  let fixture: ComponentFixture<MultiJoueurGenererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiJoueurGenererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiJoueurGenererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
