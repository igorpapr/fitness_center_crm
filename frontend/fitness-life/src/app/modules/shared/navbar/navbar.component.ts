import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/services/auth/authentication.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {UserRole} from "../../core/model/user-role";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isSignedIn: boolean;
  isAdmin: boolean;
  isMenuCollapsed: boolean = true;

  constructor(private authenticationService: AuthenticationService,
              private modalService: NgbModal,
              private router: Router) {
    this.isSignedIn = false;
    this.isAdmin = false;
  }


  ngOnInit(): void {
    this.isSignedIn = (this.authenticationService.currentUserValue !== undefined);
    if (this.isSignedIn) {
      let currentRole = this.authenticationService.currentUserValue.userRole;
      this.isAdmin = (this.isSignedIn &&
        currentRole === UserRole.ADMIN);
    }
  }

  openSignInForm() {
    //this.modalService.open(SigninComponent);
  }

  openSignUpForm() {
    //this.modalService.open(SignupComponent);
  }

  logOut() {
    this.router.navigate(['/']).then(
      () => {
        this.authenticationService.logOut();
        location.reload()}
    );
  }

}
