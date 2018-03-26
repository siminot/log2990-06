import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import { CarGameComponent } from "./carApp/game-component/carGame.component";
import { MainGrilleComponent } from "./crosswords/main-grille/main-grille.component";
import { ConfigPartieComponent } from "./crosswords/config-partie/config-partie.component";
import { PisteComponent } from "./carApp/piste-component/piste.component";
import { AdministrateurComponent } from "./carApp/administrateur-component/administrateur.component";
import { ChoixCourseComponent } from "./carApp/choixCourse-component/choixCourse.component";

const routes: Routes = [
  { path: "CarGame", component: CarGameComponent },
  { path: "editeurPistes", component: PisteComponent },
  { path: "CrosswordsGame", component: MainGrilleComponent },
  { path: "ConfigPartie", component: ConfigPartieComponent},
  { path: "admin", component: AdministrateurComponent},
  { path: "choixCourse", component: ChoixCourseComponent}
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
