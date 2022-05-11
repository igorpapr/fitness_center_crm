import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Page} from "../../core/model/page";
import {DateService} from "../../core/services/util/date.service";
import {AuthenticationService} from "../../core/services/auth/authentication.service";
import {ToastsService} from "../../core/services/toasts.service";
import {WindowService} from "../../core/services/util/window.service";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {Customer} from "../../core/model/customer";
import {CustomerService} from "../../core/services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  paginationObject: Page<Customer>;
  faSpinner = faSpinner;
  isLoading: boolean = false;
  isEmpty: boolean = false;

  currentPageNumber: number = 1;
  readonly pageSize: number = 8;

  constructor(private dateService: DateService,
              private authenticationService: AuthenticationService,
              private customerService: CustomerService,
              private toastsService: ToastsService,
              private windowService: WindowService,
              private router: Router) {
    this.paginationObject = null;
  }

  ngOnInit(): void{
    this.fetchCustomers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private fetchCustomers() {
    this.isLoading = true;
    this.customerService.getAllCustomersList(this.currentPageNumber - 1, this.pageSize)
      .subscribe(
        data => {
          this.paginationObject = data;
          this.isLoading = false;
          this.isEmpty = data?.content.length === 0;
        }, error => {
          console.error(error);
          this.toastsService.toastAddDanger('Something went wrong during fetching customers from the server. Please, contact the administrators');
          this.isLoading = false;
        }
      );
  }

  changePage(event: number) {
    this.currentPageNumber = event;
    this.fetchCustomers();
    this.windowService.scrollToTop();
  }

  navigateVisitations(event: Event, customer: Customer) {
    event.preventDefault();

    this.router.navigateByUrl(`/visitations`, {state: { customer: customer}});
  }

}
