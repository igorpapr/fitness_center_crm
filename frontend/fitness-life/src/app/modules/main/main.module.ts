import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {CoreModule} from "../core/core.module";
import {SharedModule} from "../shared/shared.module";
import {AppRoutingModule} from "../../app-routing.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    RouterModule
  ]
})
export class MainModule {
}
