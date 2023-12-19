import {Component} from '@angular/core';
import {RegisterOrLoginComponent} from "../register-or-login/register-or-login.component";
import {AppComponent} from "../../app.component";
import {NgIf} from "@angular/common";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-hero-section-home',
  standalone: true,
  imports: [
    RegisterOrLoginComponent,
    NgIf
  ],
  templateUrl: './hero-section-home.component.html',
  styleUrl: './hero-section-home.component.css'
})
export class HeroSectionHomeComponent {
  loggedInUser: any;

  constructor(private authService: AuthService) {
    this.loggedInUser = authService.getLoggedInUser();
  }
}
