import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastsService} from "../../core/services/toasts.service";
import {Router} from "@angular/router";
import {ServiceDto} from "../../core/model/dto/service-dto";
import {FitnessServicesService} from "../../core/services/fitness-services.service";

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.scss']
})
export class ServiceCreateComponent implements OnInit {

  private subscription: Subscription = new Subscription();

  // @ts-ignore
  serviceCreationFormGroup: FormGroup = new FormGroup({
    Title: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    Description: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    Price: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ])
  });

  constructor(private servicesService: FitnessServicesService,
              private toastsService: ToastsService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  saveNewService(): void {
    let serviceDto: ServiceDto = new ServiceDto();
    serviceDto.title = this.serviceCreationFormGroup.get('Title')?.value;
    serviceDto.description = this.serviceCreationFormGroup.get('Description')?.value;
    serviceDto.price = this.serviceCreationFormGroup.get('Price')?.value;
    this.subscription.add(
      this.servicesService.createService(serviceDto).subscribe(
        () => {
          this.toastsService.toastAddSuccess('The new service was successfully created.')
          this.router.navigateByUrl('/services');
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

}
