import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesListComponent } from './services-list/services-list.component';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {AppRoutingModule} from "../../app-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ServiceCreateComponent } from './service-create/service-create.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ServicesListComponent,
    ServiceCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class FitnessServicesModule { }
