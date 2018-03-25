import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrementPisteComponent } from './enregistrement-piste.component';

describe('EnregistrementPisteComponent', () => {
  let component: EnregistrementPisteComponent;
  let fixture: ComponentFixture<EnregistrementPisteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnregistrementPisteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrementPisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
