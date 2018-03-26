import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FinPartieMultiComponent } from "./fin-partie-multi.component";
import { InfoJoueurSoloComponent } from "../../info-partie/info-joueur-solo/info-joueur-solo.component";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { ServiceInteractionComponent } from "../../service-interaction-component/service-interaction-component";
import { ServiceHttp } from "../../serviceHttp/http-request.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe("FinPartieSoloComponent", () => {
  let component: FinPartieMultiComponent;
  let fixture: ComponentFixture<FinPartieMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinPartieMultiComponent ],
      providers: [ InfoJoueurSoloComponent, InfojoueurService, ServiceInteractionComponent, ServiceHttp, HttpClient, HttpHandler ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinPartieMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
