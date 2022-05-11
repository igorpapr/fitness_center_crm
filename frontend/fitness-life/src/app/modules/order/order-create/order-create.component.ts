import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastsService} from "../../core/services/toasts.service";
import {Router} from "@angular/router";
import {OrderService} from "../../core/services/order.service";
import {CustomerService} from "../../core/services/customer.service";
import {Page} from "../../core/model/page";
import {Customer} from "../../core/model/customer";
import {OrderDto} from "../../core/model/dto/order-dto";
import {DateService} from "../../core/services/util/date.service";
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import {WindowService} from "../../core/services/util/window.service";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  paginationObject: Page<Customer>;
  isLoading: boolean = false;
  isEmpty: boolean = false;
  faSpinner = faSpinner;

  currentPageNumber: number = 1;
  readonly pageSize: number = 2;

  serviceFromState = null;
  chosenCustomer?: Customer = null;

  // @ts-ignore
  orderCreationFormGroup: FormGroup = new FormGroup({
    CustomerId: new FormControl('', [
      Validators.required
    ]),
    DateStart: new FormControl('', [
      Validators.required
    ]),
    DateEnd: new FormControl('', []),
    PaymentAmount: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ])
  });

  constructor(private orderService: OrderService,
              private customerService: CustomerService,
              private toastsService: ToastsService,
              private router: Router,
              private dateService: DateService,
              private windowService: WindowService) {
    this.paginationObject = null;
  }

  ngOnInit(): void {
    this.serviceFromState = window.history.state.service;
    this.fetchCustomers();
  }

  fetchCustomers() {
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

  saveNewOrder(): void {
    let orderDto: OrderDto = new OrderDto();
    orderDto.customer = {id: this.chosenCustomer.id}
    orderDto.service = {id: this.serviceFromState.id}
    let dateStartObj = this.orderCreationFormGroup.get('DateStart')?.value;
    orderDto.dateStart = this.buildDateFromPickerObj(dateStartObj)
//      formatDate(this.buildDateFromPickerObj(dateObj), 'YYYY-MM-ddT00:00:00.00', 'en-US'))
    let dateEndObj = this.orderCreationFormGroup.get('DateEnd')?.value;
    orderDto.dateEnd = this.buildDateFromPickerObj(dateEndObj)
    orderDto.paymentAmount = this.orderCreationFormGroup.get('PaymentAmount')?.value;

    this.subscription.add(
      this.orderService.createOrder(orderDto).subscribe(
        () => {
          this.toastsService.toastAddSuccess('The new order was successfully created.')
          this.router.navigateByUrl(`/orders`, {state: {service: this.serviceFromState}});
        }, error => {
          console.error(error)
          this.toastsService.toastAddDanger('Something went wrong during the new service creation')
        }
      )
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  chooseCustomer(event: Event, customer: Customer) {
    event.preventDefault();

    this.chosenCustomer = customer;
    this.orderCreationFormGroup.patchValue({CustomerId: this.chosenCustomer.id})
  }

  changePage(event: number) {
    this.currentPageNumber = event;
    this.fetchCustomers();
    this.windowService.scrollToTop();
  }

  buildDateFromPickerObj(pickerObj) {
    return new Date(pickerObj.year, pickerObj.month, pickerObj.day, 3);
  }

}
