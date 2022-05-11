import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {CustomerService} from "../../core/services/customer.service";
import {ToastsService} from "../../core/services/toasts.service";
import {Router} from "@angular/router";
import {CustomerDto} from "../../core/model/dto/customer-dto";

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss']
})
export class CustomerCreateComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  // @ts-ignore
  customerCreationFormGroup: FormGroup = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    LastName: new FormControl('', [
      Validators.minLength(4)
    ]),
    Email: new FormControl('', [
      Validators.minLength(4)
    ])
  });

  constructor(private customerService: CustomerService,
              private toastsService: ToastsService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  saveNewCustomer(): void {
    let customerDto: CustomerDto = new CustomerDto();
    customerDto.firstName = this.customerCreationFormGroup.get('FirstName')?.value;
    customerDto.lastName = this.customerCreationFormGroup.get('LastName')?.value;
    customerDto.email = this.customerCreationFormGroup.get('Email')?.value;
    this.subscription.add(
      this.customerService.createCustomer(customerDto).subscribe(
        () => {
          this.toastsService.toastAddSuccess('The new customer was successfully created.')
          this.router.navigateByUrl('/customers');
        }, error => {
          console.error(error)
          this.toastsService.toastAddDanger('Something went wrong during the new customer creation')
        }
      )
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
