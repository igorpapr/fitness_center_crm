import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from "./modules/core/core.module";
import {SharedModule} from "./modules/shared/shared.module";
import {MainModule} from "./modules/main/main.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    FontAwesomeModule,
    SharedModule,
    MainModule,
    ReactiveFormsModule,
    //NgBootstrapFormValidationModule.forRoot(),
    //NgBootstrapFormValidationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
