import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../core/services/auth/authentication.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  isSignedIn?: boolean = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isSignedIn = this.authenticationService.isAuthenticated()
  }



}
