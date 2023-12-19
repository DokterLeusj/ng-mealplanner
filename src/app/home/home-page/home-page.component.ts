import { Component } from '@angular/core';
import {RegisterOrLoginComponent} from "../register-or-login/register-or-login.component";
import {HeroSectionHomeComponent} from "../hero-section-home/hero-section-home.component";
import {AuthService} from "../../auth.service";
import {CommonModule, NgIf} from "@angular/common";

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

  constructor(private authService: AuthService){

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUsername(): string {
    return this.authService.getUsername();
  }
}
