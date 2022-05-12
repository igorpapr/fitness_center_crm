import { Component, OnInit } from '@angular/core';
import {AuthenticationRequestDto} from "../../core/model/dto/authentication-request";
import {first} from "rxjs/operators";
import {AuthenticationService} from "../../core/services/auth/authentication.service";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              public activeModal: NgbActiveModal,
              public modalService: NgbModal) {
  }
  emailRegexp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
  email = '';
  password = '';
  // @ts-ignore
  isLoading: boolean;
  // @ts-ignore
  message: string;

  ngOnInit(): void {
  }

  authenticate() {
    if (this.isValid()) {
      let dto = new AuthenticationRequestDto(this.email, this.password);
      this.authenticationService.authenticateUser(dto)
        .pipe(first())
        .subscribe(
          n => {
            location.reload();
            this.isLoading = false;
          },
          error => {
            this.message = error.error ? error.error.message : "Something went wrong during the authorization. " +
              "Please, contact the administrator";
            this.isLoading = false;
          }
        );
      this.isLoading = true;
    }
  }

  public isValid(): boolean {
    if (this.email === '' || this.email == null) {
      this.message = 'The login field must not be empty.'
      return false;
    }
    if (this.password === '' || this.password == null) {
      this.message = 'The password field must not be empty';
      return false;
    }
    return true;
  }
}
