import { TestBed, ComponentFixture } from "@angular/core/testing";
import { GrilleMultijoueurComponent } from "./grilleMultijoueur.component";
import { ServiceInteractionComponent } from "../../service-interaction-component/service-interaction-component";
import { InfojoueurService } from "../../service-info-joueur/infojoueur.service";
import { SocketService } from "../../service-socket/service-socket";
import { RouterTestingModule } from "@angular/router/testing";
import { ServiceHttp} from "../../serviceHttp/http-request.service";
import { HttpClient, HttpHandler } from "@angular/common/http";

class MockSocketService {
    public commencerPartie(): void {
    }
}

describe("GrilleMultiJoeur", () => {
        let fixture: ComponentFixture<GrilleMultijoueurComponent>;
        let componentT: GrilleMultijoueurComponent;

        beforeEach(async() => {

        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            providers: [HttpHandler],
            declarations: [GrilleMultijoueurComponent],
        }).compileComponents().catch();
        TestBed.overrideComponent(GrilleMultijoueurComponent, {
            set: {
              providers: [
                { provide: SocketService, useClass: MockSocketService },
                InfojoueurService, ServiceInteractionComponent, ServiceHttp, HttpClient,
              ]
            }
          });

        });

        beforeEach(() => {
        fixture = TestBed.createComponent(GrilleMultijoueurComponent);
        componentT = fixture.componentInstance;
        });

        it("Construction", () => {
            expect(componentT).toBeTruthy();
        });
    });
