import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Page} from "../../core/model/page";
import {Customer} from "../../core/model/customer";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrderService} from "../../core/services/order.service";
import {ToastsService} from "../../core/services/toasts.service";
import {Router} from "@angular/router";
import {DateService} from "../../core/services/util/date.service";
import {WindowService} from "../../core/services/util/window.service";
import {OrderDto} from "../../core/model/dto/order-dto";
import {VisitationService} from "../../core/services/visitation.service";
import {Order} from "../../core/model/order";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {VisitationDto} from "../../core/model/dto/visitation-dto";

@Component({
  selector: 'app-visitation-create',
  templateUrl: './visitation-create.component.html',
  styleUrls: ['./visitation-create.component.scss']
})
export class VisitationCreateComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  paginationObject: Page<Order>;
  isLoading: boolean = false;
  isEmpty: boolean = false;
  faSpinner = faSpinner;

  currentPageNumber: number = 1;
  readonly pageSize: number = 2;

  customerFromState = null;
  chosenOrder?: Order = null;

  // @ts-ignore
  visitationCreationFormGroup: FormGroup = new FormGroup({
    OrderId: new FormControl('', [
      Validators.required
    ]),
    DateStart: new FormControl('', [
      Validators.required
    ]),
    DateEnd: new FormControl('', [])
  });

  constructor(private orderService: OrderService,
              private visitationService: VisitationService,
              private toastsService: ToastsService,
              private router: Router,
              private dateService: DateService,
              private windowService: WindowService) {
    this.paginationObject = null;
  }

  ngOnInit(): void {
    this.customerFromState = window.history.state.customer;
    this.fetchOrders();
  }

  fetchOrders() {
    this.isLoading = true;
    this.orderService.getAllOrdersByCustomer(this.currentPageNumber - 1, this.pageSize, this.customerFromState.id)
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

  saveNewVisitation(): void {
    let visitationDto: VisitationDto = new VisitationDto();
    visitationDto.order = {id: this.chosenOrder.id}
    visitationDto.customer = {id: this.customerFromState.id}
    let dateStartObj = this.visitationCreationFormGroup.get('DateStart')?.value;
    visitationDto.dateStart = this.buildDateFromPickerObj(dateStartObj)
//      formatDate(this.buildDateFromPickerObj(dateObj), 'YYYY-MM-ddT00:00:00.00', 'en-US'))
    let dateEndObj = this.visitationCreationFormGroup.get('DateEnd')?.value;
    visitationDto.dateEnd = this.buildDateFromPickerObj(dateEndObj)

    this.subscription.add(
      this.visitationService.createVisitation(visitationDto).subscribe(
        () => {
          this.toastsService.toastAddSuccess('The new visitation was successfully created.')
          this.router.navigateByUrl(`/visitations`, {state: { customer: this.customerFromState}});
        }, error => {
          console.error(error)
          this.toastsService.toastAddDanger('Something went wrong during the new visitation creation')
        }
      )
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  chooseOrder(event: Event, order: Order) {
    event.preventDefault();

    this.chosenOrder = order;
    this.visitationCreationFormGroup.patchValue({OrderId: this.chosenOrder.id})
  }

  changePage(event: number) {
    this.currentPageNumber = event;
    this.fetchOrders();
    this.windowService.scrollToTop();
  }

  buildDateFromPickerObj(pickerObj) {
    return new Date(pickerObj.year, pickerObj.month, pickerObj.day,3);
  }

}
