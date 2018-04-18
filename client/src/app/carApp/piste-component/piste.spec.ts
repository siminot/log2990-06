import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { GestionnaireBDCourse } from "../baseDeDonnee/GestionnaireBDCourse";
import { GestionnaireEditionPiste } from "../editeurPiste/gestionnaireEditionPiste";
import { PisteComponent } from "./piste.component";
import { ServiceDeRenduPistes } from "../serviceDeRendu/serviceDeRenduPistes";
import { GestionnaireClavier } from "../clavier/gestionnaireClavier";
import { GestionnaireEcran } from "../ecran/gestionnaireEcran";
import { GestionnaireSouris } from "../souris/gestionnaireSouris";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { GestionnaireCameraPiste } from "../camera/GestionnaireCameraPiste";
import { GestionnaireScenePiste } from "../scene/GestionnaireScenePiste";
import { NbCaractMaxDirective } from "../directive-nb-caract-max/nb-caract-max.directive";

describe("PisteComponent", () => {
    let component: PisteComponent;
    let fixture: ComponentFixture<PisteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule],
            declarations: [PisteComponent, NbCaractMaxDirective],
            providers: [ GestionnaireEditionPiste,
                         GestionnaireBDCourse,
                         ServiceDeRenduPistes,
                         GestionnaireClavier,
                         GestionnaireEcran,
                         GestionnaireSouris,
                         GestionnaireCameraPiste,
                         GestionnaireScenePiste ]
        })
            .compileComponents()
            .catch();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PisteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
