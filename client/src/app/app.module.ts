import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { ApercuPisteComponent } from "./carApp/apercuPiste/apercuPiste.component";
import { CarGameComponent } from "./carApp/game-component/carGame.component";
import { PisteComponent } from "./carApp/piste-component/piste.component";
import { AdministrateurComponent } from "./carApp/administrateur-component/administrateur.component";

import { ServiceDeRenduJeu } from "./carApp/serviceDeRendu/serviceDeRenduJeu";
import { GestionnaireScene } from "./carApp/scene/GestionnaireScene";
import { GestionnaireCamera } from "./carApp/camera/GestionnaireCamera";
import { GestionnaireSkybox } from "./carApp/skybox/gestionnaireSkybox";
import { GestionnaireVoitures } from "./carApp/voiture/gestionnaireVoitures";

import { GestionnaireClavier } from "./carApp/clavier/gestionnaireClavier";
import { GestionnaireEcran } from "./carApp/ecran/gestionnaireEcran";
import { GestionnaireSouris } from "./carApp/souris/gestionnaireSouris";

import { ServiceDeRenduPistes } from "./carApp/serviceDeRendu/serviceDeRenduPistes";
import { GestionnaireScenePiste } from "./carApp/scene/GestionnaireScenePiste";
import { GestionnaireCameraPiste } from "./carApp/camera/GestionnaireCameraPiste";
import { ChoixCourseComponent } from "./carApp/choixCourse-component/choixCourse.component";
import { FormsModule } from "@angular/forms";
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
import { FinPartieSoloComponent } from "./crosswords/fin-partie/solo/fin-partie-solo.component";
import { GrilleMultijoueurComponent } from "./crosswords/grille/multijoueurs/grilleMultijoueur.component";
import { MainGrilleMultiComponent } from "./crosswords/main-grille-multi/main-grille-multi.component";
import { SocketService } from "./crosswords/service-socket/service-socket";
import { GestionnaireBDCourse } from "./carApp/baseDeDonnee/GestionnaireBDCourse";
import { GestionnaireEditionPiste } from "./carApp/editeurPiste/gestionnaireEditionPiste";
import { VueTeteHauteComponent } from "./carApp/vue-tete-haute/vue-tete-haute/vue-tete-haute.component";
import { TimerService } from "./carApp/timer/timer.service";
import { DefinitionComponent } from "./crosswords/definition/definition.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";

import { DecimalPipe } from "@angular/common";
import { FinCourseComponent } from "./carApp/fin-course/fin-course.component";
import { TableauMeilleursTempsComponent } from "./carApp/tableau-meilleurs-temps/tableau-meilleurs-temps.component";
import { GestionnaireDesTempsService } from "./carApp/GestionnaireDesTemps/gestionnaire-des-temps.service";
import { EstUnChiffreDirective } from "./carApp/directive-est-un-chiffre/est-un-chiffre.directive";
import { ServiceDeRenduApercu } from "./carApp/serviceDeRendu/serviceDeRenduApercu";
import { GestionnaireSceneApercu } from "./carApp/scene/GestionnaireSceneApercu";
import { NbCaractMaxDirective } from "./carApp/directive-nb-caract-max/nb-caract-max.directive";

@NgModule({
    declarations: [
        ApercuPisteComponent,
        AppComponent,
        CarGameComponent,
        PisteComponent,
        AdministrateurComponent,
        ChoixCourseComponent,
        MainGrilleComponent,
        GrilleComponent,
        ConfigPartieComponent,
        DirectiveFocusDirective,
        DefinitionHComponent,
        DefinitionVComponent,
        InfoJoueurSoloComponent,
        GrilleMultijoueurComponent,
        InfoPartieMultijoueurComponent,
        FinPartieSoloComponent,
        MainGrilleMultiComponent,
        VueTeteHauteComponent,
        FinCourseComponent,
        VueTeteHauteComponent,
        TableauMeilleursTempsComponent,
        EstUnChiffreDirective,
        NbCaractMaxDirective,
        DefinitionComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        MatDividerModule
    ],
    providers: [
        ServiceDeRenduApercu,
        ServiceDeRenduJeu,
        ServiceDeRenduPistes,
        GestionnaireScene,
        GestionnaireSceneApercu,
        GestionnaireScenePiste,
        GestionnaireCamera,
        GestionnaireCameraPiste,
        GestionnaireBDCourse,
        GestionnaireEditionPiste,
        GestionnaireSkybox,
        GestionnaireVoitures,
        GestionnaireClavier,
        GestionnaireEcran,
        GestionnaireSouris,
        ServiceInteractionComponent,
        ServiceHttp,
        SocketService,
        InfojoueurService,
        DecimalPipe,
        TimerService,
        GestionnaireDesTempsService
    ],
    bootstrap: [AppComponent],
    exports: [
        AppComponent,
        ApercuPisteComponent,
        CarGameComponent,
        PisteComponent,
        AdministrateurComponent,
        MainGrilleComponent,
        GrilleComponent,
        DefinitionVComponent,
        DefinitionHComponent,
        FinPartieSoloComponent,
        GrilleMultijoueurComponent
    ],
})
export class AppModule { }
