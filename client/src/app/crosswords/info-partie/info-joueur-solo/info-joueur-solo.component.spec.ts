import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";

import { InfoJoueurSoloComponent } from "./info-joueur-solo.component";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { RequeteDeGrilleAbs } from "../../service-Requete-de-Grille/requete-de-grilleAbs";
import { ServiceHttp } from "../../serviceHttp/http-request.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../dialog/dialog.component";
import { SocketService } from "../../service-socket/service-socket";

import * as CONST from "../../constantes";

describe("InfoJoueur1Component", () => {
  let component: InfoJoueurSoloComponent;
  let fixture: ComponentFixture<InfoJoueurSoloComponent>;
  let infojoueur: InfojoueurService;
  let serviceGrille: RequeteDeGrilleAbs;
  let serviceHttp: ServiceHttp;
  let dialogRef: MatDialogRef<DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ InfojoueurService, RequeteDeGrilleAbs, ServiceHttp, SocketService ],
      declarations: [ InfoJoueurSoloComponent ]
    })
    .compileComponents()
    .catch(() => { throw new Error("Erreur de la creation du test"); });
  }));

  beforeEach(inject([serviceHttp], (service: ServiceHttp) => {
    serviceHttp = service;
    serviceGrille = new RequeteDeGrilleAbs(serviceHttp);
    fixture = TestBed.createComponent(InfoJoueurSoloComponent);
    component = fixture.componentInstance;
    infojoueur = new InfojoueurService();
    dialogRef = new MatDialogRef<DialogComponent>;
    component = new InfoJoueurSoloComponent(infojoueur, serviceGrille, ServiceHttp, dialogRef);
    fixture.detectChanges();
  }));

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
