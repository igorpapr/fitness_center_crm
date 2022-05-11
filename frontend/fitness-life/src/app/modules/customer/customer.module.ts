import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { VisitationsComponent } from './visitations/visitations.component';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {AppRoutingModule} from "../../app-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import { VisitationCreateComponent } from './visitation-create/visitation-create.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    VisitationsComponent,
    CustomerCreateComponent,
    VisitationCreateComponent
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
export class CustomerModule { }
