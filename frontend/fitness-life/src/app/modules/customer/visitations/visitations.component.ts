import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Page} from "../../core/model/page";
import {DateService} from "../../core/services/util/date.service";
import {AuthenticationService} from "../../core/services/auth/authentication.service";
import {ToastsService} from "../../core/services/toasts.service";
import {WindowService} from "../../core/services/util/window.service";
import {Visitation} from "../../core/model/visitation";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {VisitationService} from "../../core/services/visitation.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-visitations',
  templateUrl: './visitations.component.html',
  styleUrls: ['./visitations.component.scss']
})
export class VisitationsComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  paginationObject: Page<Visitation>;
  faSpinner = faSpinner;
  isLoading: boolean = false;
  isEmpty: boolean = false;
  customerFromState = null;

  currentPageNumber: number = 1;
  readonly pageSize: number = 8;

  constructor(private dateService: DateService,
              private authenticationService: AuthenticationService,
              private visitationService: VisitationService,
              private toastsService: ToastsService,
              private windowService: WindowService,
              private router: Router) {
    this.paginationObject = null;
  }

  ngOnInit(): void {
    this.customerFromState = window.history.state.customer;
    this.fetchVisitations(this.customerFromState ? this.customerFromState.id : 1);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private fetchVisitations(customerId: number) {
    this.isLoading = true;
    this.visitationService.getAllVisitationsListByCustomer(this.currentPageNumber - 1, this.pageSize, customerId)
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
    this.fetchVisitations(this.customerFromState ? this.customerFromState.id : 1);
    this.windowService.scrollToTop();
  }

  navigateVisitationCreation(event: Event) {
    event.preventDefault();

    this.router.navigateByUrl(`/visitation-create`, {state: { customer: this.customerFromState}});
  }

}
