import {Component} from '@angular/core';
import {RegisterOrLoginComponent} from "../register-or-login/register-or-login.component";
import {AppComponent} from "../../app.component";
import {NgIf} from "@angular/common";
import {AuthService} from "../../auth.service";
import {LoggedInUserService} from "../../../logged-in-user.service";
import {UserListDto} from "../../user/model/dto/user-list-dto";

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
  loggedInUser:UserListDto|null=null;
  constructor(private loggedInUserService: LoggedInUserService){
    this.loggedInUser=this.loggedInUserService.getLoggedInUser();
  }
  isLoggedIn() {
    return this.loggedInUserService.isLoggedIn()
  }

  getUsername(): string |undefined{
    return this.loggedInUser?.username;
  }

}
