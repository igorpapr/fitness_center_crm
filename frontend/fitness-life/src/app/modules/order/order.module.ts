import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {AppRoutingModule} from "../../app-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { OrderCreateComponent } from './order-create/order-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    OrderListComponent,
    OrderCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ]
})
export class OrderModule { }
