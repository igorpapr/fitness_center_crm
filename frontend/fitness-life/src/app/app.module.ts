import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CoreModule} from "./modules/core/core.module";
import {SharedModule} from "./modules/shared/shared.module";
import {MainModule} from "./modules/main/main.module";
import {ReactiveFormsModule} from "@angular/forms";
import {FitnessServicesModule} from "./modules/fitness-services/fitness-services.module";
import {CustomerModule} from "./modules/customer/customer.module";
import {OrderModule} from "./modules/order/order.module";
import {AuthModule} from "./modules/auth/auth.module";
import {AuthenticationInterceptor} from "./modules/core/utils/authentication.interceptor";
import {UnauthorizederrorInterceptor} from "./modules/core/utils/unauthorizederror.interceptor";

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
    FitnessServicesModule,
    CustomerModule,
    OrderModule,
    AuthModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: UnauthorizederrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
