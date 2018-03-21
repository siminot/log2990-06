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
import { MainGrilleRejoindreComponent } from "./crosswords/main-grille-rejoindre/main-grille-rejoindre.component";
import { MainGrilleCreerComponent } from "./crosswords/main-grille-creer/main-grille-creer.component";
import { DialogComponent } from "./crosswords/dialog/dialog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
        MainGrilleRejoindreComponent,
        MainGrilleCreerComponent,
        DialogComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        MatDialogModule,
        BrowserAnimationsModule
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
        DialogComponent
    ],
    entryComponents: [ DialogComponent ]
})
export class AppModule { }
