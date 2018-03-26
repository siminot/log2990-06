import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from "@angular/material/dialog";

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
import { ServiceHttp } from "./crosswords/serviceHttp/http-request.service";
import { DefinitionHComponent } from "./crosswords/definition/definitionH.component";
import { DefinitionVComponent } from "./crosswords/definition/definitionV.component";
import { MainGrilleComponent } from "./crosswords/main-grille-solo/main-grille.component";
import { GrilleComponent } from "./crosswords/grille/solo/grille.component";
import { ServiceInteractionComponent } from "./crosswords/service-interaction-component/service-interaction-component";
import { ConfigPartieComponent } from "./crosswords/config-partie/config-partie.component";
import { DirectiveFocusDirective } from "./crosswords/directive-focus/directive-focus.directive";
import { InfoJoueurSoloComponent } from "./crosswords/info-partie/info-joueur-solo/info-joueur-solo.component";
import { InfoPartieMultijoueurComponent } from "./crosswords/info-partie/info-partie-multijoueur/info-partie-multijoueur.component";
import { InfojoueurService } from "./crosswords/service-info-joueur/infojoueur.service";
import { SocketService } from "./crosswords/service-socket/service-socket";
import { GrilleMultijoueurComponent } from "./crosswords/grille/multijoueurs/grilleMultijoueur.component";
import { MainGrilleMultiComponent } from "./crosswords/main-grille-multi/main-grille-multi.component";

import { FinPartieSoloComponent } from "./crosswords/fin-partie/solo/fin-partie-solo.component";
import { FinPartieMultiComponent } from "./crosswords/fin-partie/multi/fin-partie-multi.component";

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
        InfoJoueurSoloComponent,
        InfoPartieMultijoueurComponent,
        GrilleMultijoueurComponent,
        MainGrilleMultiComponent,
        FinPartieSoloComponent,
        FinPartieMultiComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatDialogModule
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
        ServiceHttp,
        InfojoueurService,
        SocketService,
        ServiceInteractionComponent
    ],
    bootstrap: [AppComponent],
    exports: [
        AppComponent,
        CarGameComponent,
        PisteComponent,
        MainGrilleComponent,
        GrilleComponent,
        DefinitionVComponent,
        DefinitionHComponent,
        GrilleMultijoueurComponent,
        FinPartieSoloComponent
    ],
    // entryComponents: [ DialogComponent ]
})
export class AppModule { }
