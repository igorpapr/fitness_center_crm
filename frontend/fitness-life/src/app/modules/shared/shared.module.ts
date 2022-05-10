import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastsComponent} from "./toasts/toasts.component";


@NgModule({
  declarations: [
    NavbarComponent,
    ToastsComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    ToastsComponent,
    NgbModule
  ]
})
export class SharedModule { }
