import { Component } from '@angular/core';
import {RegisterOrLoginComponent} from "../register-or-login/register-or-login.component";
import {HeroSectionHomeComponent} from "../hero-section-home/hero-section-home.component";
import {AuthService} from "../../auth.service";
import {CommonModule, NgIf} from "@angular/common";
import {UserService} from "../../user.service";
import {LoggedInUserService} from "../../logged-in-user.service";
import {UserListDto} from "../../user/model/dto/user-list-dto";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RegisterOrLoginComponent,
    HeroSectionHomeComponent,
    CommonModule,
    NgIf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
