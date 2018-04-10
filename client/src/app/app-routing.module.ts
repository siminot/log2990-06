import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { CarGameComponent } from "./carApp/game-component/carGame.component";
import { MainGrilleComponent } from "./crosswords/main-grille-solo/main-grille.component";
import { MainGrilleMultiComponent } from "./crosswords/main-grille-multi/main-grille-multi.component";
import { ConfigPartieComponent } from "./crosswords/config-partie/config-partie.component";
import { PisteComponent } from "./carApp/piste-component/piste.component";
import { AdministrateurComponent } from "./carApp/administrateur-component/administrateur.component";
import { ChoixCourseComponent } from "./carApp/choixCourse-component/choixCourse.component";
import { FinPartieSoloComponent } from "./crosswords/fin-partie/solo/fin-partie-solo.component";
import { TableauMeilleursTempsComponent } from "./carApp/tableau-meilleurs-temps/tableau-meilleurs-temps.component"

const routes: Routes = [
  { path: "CarGame", component: CarGameComponent },
  { path: "editeurPistes", component: PisteComponent },
  { path: "CrosswordsGame", component: MainGrilleComponent },
  { path: "ConfigPartie", component: ConfigPartieComponent },
  { path: "CrosswordsGameMulti", component: MainGrilleMultiComponent },
  { path: "FinPartie", component: FinPartieSoloComponent },
  { path: "admin", component: AdministrateurComponent },
  { path: "choixCourse", component: ChoixCourseComponent },
  { path: "tableauMeilleursTemps", component: TableauMeilleursTempsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
