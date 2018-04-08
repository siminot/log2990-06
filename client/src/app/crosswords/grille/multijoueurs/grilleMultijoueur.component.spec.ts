import { TestBed, inject, ComponentFixture } from "@angular/core/testing";
import { GrilleMultijoueurComponent } from "./grilleMultijoueur.component";
import { Component, OnInit } from "@angular/core";
import { ServiceInteractionComponent } from "../../service-interaction-component/service-interaction-component";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { EncadrementCase } from "../librairieGrille/encadrementCase";
import { GrilleAbs } from "../grilleAbs";
import { SocketService } from "../../service-socket/service-socket";
import { PaquetPartie } from "../../objetsTest/paquetPartie";
import { Mot } from "../../objetsTest/mot";
import { objetsTest } from "../../objetsTest/objetsTest";
import { LettreGrille } from "../../objetsTest/lettreGrille";
import { TAILLE_TABLEAU } from "../../constantes";
import { OpaciteCase } from "./../librairieGrille/opaciteCase";
import { Subscription } from "rxjs/Subscription";
import { RouterTestingModule } from "@angular/router/testing";
import { ServiceHttp} from "../../serviceHttp/http-request.service";
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { Socket } from "dgram";


class mockSocketService {
    public commencerPartie(): void {
        console.log("utilisation MockSocketService");
    }
}

describe("GrilleMultiJoeur", () => {
        let fixture: ComponentFixture<GrilleMultijoueurComponent>;
        let componentT: GrilleMultijoueurComponent;

        beforeEach(async() => {


        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            providers: [HttpHandler, SocketService],
            declarations: [GrilleMultijoueurComponent],
            // tslint:disable-next-line:max-line-length
        }).compileComponents();
        TestBed.overrideComponent(GrilleMultijoueurComponent, {
            set: {
              providers: [
                { provide: SocketService, useClass: mockSocketService }, InfojoueurService, ServiceInteractionComponent, ServiceHttp,
                HttpClient
              ]
            }
          });

        });


        beforeEach(() => {
        fixture = TestBed.createComponent(GrilleMultijoueurComponent);
        componentT = fixture.componentInstance;
        // componentT["mots"] = objetsTest.objetsTest;

        });

        // create component and test fixture
        it("Construction", () => {
            expect(componentT).toBeTruthy();
        });
    });
