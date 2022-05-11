import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from "./modules/main/landing-page/landing-page.component";
import {CustomerListComponent} from "./modules/customer/customer-list/customer-list.component";
import {VisitationsComponent} from "./modules/customer/visitations/visitations.component";
import {ServicesListComponent} from "./modules/fitness-services/services-list/services-list.component";
import {CustomerCreateComponent} from "./modules/customer/customer-create/customer-create.component";
import {OrderListComponent} from "./modules/order/order-list/order-list.component";
import {ServiceCreateComponent} from "./modules/fitness-services/service-create/service-create.component";
import {OrderCreateComponent} from "./modules/order/order-create/order-create.component";
import {VisitationCreateComponent} from "./modules/customer/visitation-create/visitation-create.component";

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'customers', component: CustomerListComponent},
  {path: 'visitations', component: VisitationsComponent},
  {path: 'services', component: ServicesListComponent},
  {path: 'customer-create', component: CustomerCreateComponent},
  {path: 'service-create', component: ServiceCreateComponent},
  {path: 'order-create', component: OrderCreateComponent},
  {path: 'visitation-create', component: VisitationCreateComponent},
  {path: 'orders', component: OrderListComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
