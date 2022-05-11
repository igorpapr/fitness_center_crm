import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Page} from "../../core/model/page";
import {Service} from "../../core/model/service";
import {DateService} from "../../core/services/util/date.service";
import {AuthenticationService} from "../../core/services/auth/authentication.service";
import {ToastsService} from "../../core/services/toasts.service";
import {WindowService} from "../../core/services/util/window.service";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Order} from "../../core/model/order";
import {OrderService} from "../../core/services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  paginationObject: Page<Order>;
  faSpinner = faSpinner;
  isLoading: boolean = false;
  isEmpty: boolean = false;
  serviceFromState: Service = null;

  currentPageNumber: number = 1;
  readonly pageSize: number = 8;

  constructor(private dateService: DateService,
              private authenticationService: AuthenticationService,
              private orderService: OrderService,
              private toastsService: ToastsService,
              private windowService: WindowService,
              private router: Router) {
    this.paginationObject = null;
  }

  ngOnInit(): void{
    this.serviceFromState = window.history.state.service;
    this.fetchOrdersForService(this.serviceFromState ? this.serviceFromState.id : 1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private fetchOrdersForService(serviceId: number) {
    this.isLoading = true;
    this.orderService.getAllOrdersByService(this.currentPageNumber - 1, this.pageSize, serviceId)
      .subscribe(
        data => {
          this.paginationObject = data;
          this.isLoading = false;
          this.isEmpty = data?.content.length === 0;
        }, error => {
          console.error(error);
          this.toastsService.toastAddDanger('Something went wrong during fetching orders from the server. Please, contact the administrators');
          this.isLoading = false;
        }
      );
  }

  changePage(event: number) {
    this.currentPageNumber = event;
    this.fetchOrdersForService(this.serviceFromState ? this.serviceFromState.id : 1);
    this.windowService.scrollToTop();
  }

  navigateOrderCreation(event: Event) {
    event.preventDefault();

    this.router.navigateByUrl(`/order-create`, {state: { service: this.serviceFromState}});
  }

}
