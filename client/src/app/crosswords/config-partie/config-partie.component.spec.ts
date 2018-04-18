import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ServiceHttp } from "../serviceHttp/http-request.service";
import { ConfigPartieComponent } from "./config-partie.component";
// import { ProviderAstType } from "@angular/compiler";
import { SocketService } from "../service-socket/service-socket";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Difficulte } from "../../../../../common/communication/Difficulte";
import { Router } from "@angular/router";

describe("ConfigPartieComponent", () => {
    let component: ConfigPartieComponent;
    let fixture: ComponentFixture<ConfigPartieComponent>;
    let mockRouter: Router;
    const mockHtmlElem: HTMLElement = document.createElement("div");

    beforeEach(async(() => {
        mockRouter = jasmine.createSpyObj("Router", ["navigate"]);
        TestBed.configureTestingModule({
            declarations: [ConfigPartieComponent],
            imports: [HttpClientTestingModule],
            providers: [ServiceHttp, { provide: Router, useValue: mockRouter }, SocketService]

        })

            .compileComponents()

            .catch();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfigPartieComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        mockRouter = jasmine.createSpyObj("Router", ["navigate"]);
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });

    describe("modification d'attributs", () => {

        it("devrait mettre a jour la requete", () => {
            component.ajouterDifficulte(Difficulte.Facile);
            expect(component["serviceHTTP"].difficulte).toEqual(Difficulte.Facile);
            component.ajouterDifficulte(Difficulte.Normal);
            expect(component["serviceHTTP"].difficulte).toEqual(Difficulte.Normal);
            component.ajouterDifficulte(Difficulte.Difficile);
            expect(component["serviceHTTP"].difficulte).toEqual(Difficulte.Difficile);
        });

        it("ne devrait pas mettre a jour la requete", () => {
            const DIFFICULTE_AVANT: Difficulte = component["serviceHTTP"].difficulte;
            component.ajouterDifficulte(undefined);
            expect(component["serviceHTTP"].difficulte).toEqual(DIFFICULTE_AVANT);
        });

        it("devrait modifier le nom de la partie", () => {
            component.modifierNomPartie("nouveauNom");
            expect(component["nomPartie"]).toEqual("nouveauNom");
        });

    });

    describe("Sections Visible", () => {
        it("une section devrait devenir visible", () => {
            spyOn(document, "getElementById").and.returnValue(mockHtmlElem);
            component.apparaitreSection("uneSection");
            expect(mockHtmlElem.classList.contains("visible")).toBeTruthy();
        });

        it("une section devrait devenir invisible", () => {
            spyOn(document, "getElementById").and.returnValue(mockHtmlElem);
            component.disparaitreSection("uneSection");
            expect(mockHtmlElem.classList.contains("pasVisible")).toBeTruthy();
        });

        it("le focus doit etre fait sur des section de texte", () => {
            spyOn(document, "getElementById").and.returnValue(mockHtmlElem);
            spyOn(mockHtmlElem, "focus");
            component.apparaitreSection("inputNomPartie");
            expect(mockHtmlElem.focus).toHaveBeenCalled();
        });
    });

});
