import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoueurSoloComponent } from './joueur-solo.component';

describe('JoueurSoloComponent', () => {
  let component: JoueurSoloComponent;
  let fixture: ComponentFixture<JoueurSoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoueurSoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoueurSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
