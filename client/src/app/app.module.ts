import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { CarGameComponent } from "./carApp/game-component/carGame.component";
import { PisteComponent } from "./carApp/piste-component/piste.component";

import { ServiceDeRenduJeu } from "./carApp/serviceDeRendu/serviceDeRenduJeu";
import { ServiceDeRenduPistes } from "./carApp/serviceDeRendu/serviceDeRenduPistes";
import { GestionnaireScene } from "./carApp/scene/GestionnaireScene";
import { GestionnaireCamera } from "./carApp/camera/GestionnaireCamera";
import { GestionnaireSkybox } from "./carApp/skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "./carApp/voiture/gestionnaireVoitures";
import { GestionnaireClavier } from "./carApp/clavier/gestionnaireClavier";
import { GestionnaireEcran } from "./carApp/ecran/gestionnaireEcran";
import { GestionnaireSouris } from "./carApp/souris/gestionnaireSouris";
import { GestionnaireScenePiste } from "./carApp/piste-component/gestionnaireScenePiste";
import { GestionnaireCameraPiste } from "./carApp/piste-component/gestionnaireCameraPiste";
import { GestionnairePiste } from "./carApp/piste-component/GestionnairePiste";

import { AppRoutingModule } from ".//app-routing.module";
import { HttpeReqService } from "./crosswords/httpRequest/http-request.service";

import { DefinitionHComponent} from "./crosswords/definition/definitionH.component";
import { DefinitionVComponent} from "./crosswords/definition/definitionV.component";
import { MainGrilleComponent } from "./crosswords/main-grille/main-grille.component";
import { GrilleComponent } from "./crosswords/grille/grille.component";
import { RequeteDeGrilleService } from "./crosswords/service-Requete-de-Grille/requete-de-grille.service";
import { ConfigPartieComponent } from "./crosswords/config-partie/config-partie.component";
import { DirectiveFocusDirective } from "./crosswords/directive-focus/directive-focus.directive";
import { InfoJoueur1Component } from "./crosswords/info-joueur1/info-joueur1.component";
import { InfojoueurService } from "./crosswords/service-info-joueur/infojoueur.service";

@NgModule({
    declarations: [
        AppComponent,
        CarGameComponent,
        PisteComponent,
        MainGrilleComponent,
        GrilleComponent,
        ConfigPartieComponent,
        DirectiveFocusDirective,
        DefinitionHComponent,
        DefinitionVComponent,
        InfoJoueur1Component
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        ServiceDeRenduJeu,
        ServiceDeRenduPistes,
        GestionnaireScene,
        GestionnaireScenePiste,
        GestionnaireCamera,
        GestionnaireCameraPiste,
        GestionnaireSkybox,
        GestionnaireVoitures,
        GestionnaireClavier,
        GestionnaireEcran,
        GestionnaireSouris,
        GestionnairePiste,
        RequeteDeGrilleService,
        HttpeReqService,
        InfojoueurService
    ],
    bootstrap: [ AppComponent ],
    exports: [
        AppComponent,
        CarGameComponent,
        PisteComponent,
        MainGrilleComponent,
        GrilleComponent,
        DefinitionVComponent,
        DefinitionHComponent
    ]
})
export class AppModule { }
