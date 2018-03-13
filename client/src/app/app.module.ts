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
import { HttpeReqService } from "./crosswords/httpRequest/http-request.service";

import { DefinitionHComponent } from "./crosswords/definition/definitionH.component";
import { DefinitionVComponent } from "./crosswords/definition/definitionV.component";
import { MainGrilleComponent } from "./crosswords/main-grille/main-grille.component";
import { GrilleComponent } from "./crosswords/grille/grille.component";
import { RequeteDeGrilleAbs } from "./crosswords/service-Requete-de-Grille/requete-de-grilleAbs";
import { ConfigPartieComponent } from "./crosswords/config-partie/config-partie.component";
import { DirectiveFocusDirective } from "./crosswords/directive-focus/directive-focus.directive";
import { InfoJoueurSoloComponent } from "./crosswords/info-partie/info-joueur-solo/info-joueur-solo.component";
import { InfoPartieMultijoueurComponent } from "./crosswords/info-partie/info-partie-multijoueur/info-partie-multijoueur.component";
import { InfojoueurService } from "./crosswords/service-info-joueur/infojoueur.service";
import { ServiceSocketService } from "./crosswords/service-socket/service-socket.service";
import { GrilleRejointeComponent } from "./crosswords/grille/multijoueurs/grilleRejointe.component";
import { GrilleCreeeComponent } from "./crosswords/grille/multijoueurs/grilleCreee.component";
import { MainGrilleRejoindreComponent } from "./crosswords/main-grille-rejoindre/main-grille-rejoindre.component";
import { MainGrilleCreerComponent } from "./crosswords/main-grille-creer/main-grille-creer.component";
import { DialogComponent } from "./crosswords/dialog/dialog.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        GrilleRejointeComponent,
        GrilleCreeeComponent,
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
        HttpeReqService,
        InfojoueurService,
        ServiceSocketService,
        RequeteDeGrilleAbs
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
        GrilleRejointeComponent,
        GrilleCreeeComponent,
        DialogComponent
    ],
    entryComponents: [ DialogComponent ]
})
export class AppModule { }
