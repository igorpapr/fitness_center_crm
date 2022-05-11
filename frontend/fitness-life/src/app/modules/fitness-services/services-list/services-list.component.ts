import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {Service} from "../../core/model/service";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {DateService} from "../../core/services/util/date.service";
import {AuthenticationService} from "../../core/services/auth/authentication.service";
import {FitnessServicesService} from "../../core/services/fitness-services.service";
import {ToastsService} from "../../core/services/toasts.service";
import {Page} from "../../core/model/page";
import {WindowService} from "../../core/services/util/window.service";
import {Customer} from "../../core/model/customer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  paginationObject: Page<Service>;
  faSpinner = faSpinner;
  isLoading: boolean = false;
  isEmpty: boolean = false;

  currentPageNumber: number = 1;
  readonly pageSize: number = 8;

  constructor(private dateService: DateService,
              private authenticationService: AuthenticationService,
              private fitnessServicesService: FitnessServicesService,
              private toastsService: ToastsService,
              private windowService: WindowService,
              private router: Router) {
    this.paginationObject = null;
  }

  ngOnInit(): void{
    this.fetchServices();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private fetchServices() {
    this.isLoading = true;
    this.fitnessServicesService.getAllServicesList(this.currentPageNumber - 1, this.pageSize)
      .subscribe(
        data => {
          this.paginationObject = data;
          this.isLoading = false;
          this.isEmpty = data?.content.length === 0;
        }, error => {
          console.error(error);
          this.toastsService.toastAddDanger('Something went wrong during fetching services from the server. Please, contact the administrators');
          this.isLoading = false;
        }
      );
  }

  changePage(event: number) {
    this.currentPageNumber = event;
    this.fetchServices();
    this.windowService.scrollToTop();
  }

  navigateOrders(event: Event, service: Service) {
    event.preventDefault();

    this.router.navigateByUrl(`/orders`, {state: { service: service}});
  }

}
