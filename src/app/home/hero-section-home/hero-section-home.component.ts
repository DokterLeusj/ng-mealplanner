import {Component} from '@angular/core';
import {RegisterOrLoginComponent} from "../register-or-login/register-or-login.component";
import {AppComponent} from "../../app.component";
import {NgIf, NgSwitch, NgSwitchCase} from "@angular/common";
import {AuthService} from "../../auth.service";
import {LoggedInUserService} from "../../logged-in-user.service";
import {UserListDto} from "../../user/model/dto/user-list-dto";
import {LoggedInDashboardComponent} from "../logged-in-dashboard/logged-in-dashboard.component";

@Component({
  selector: 'app-hero-section-home',
  standalone: true,
  imports: [
    RegisterOrLoginComponent,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    LoggedInDashboardComponent
  ],
  templateUrl: './hero-section-home.component.html',
  styleUrl: './hero-section-home.component.css'
})
export class HeroSectionHomeComponent {

  constructor(private loggedInUserService: LoggedInUserService){
  }
  isLoggedIn() {
    return this.loggedInUserService.isLoggedIn();
  }



}
