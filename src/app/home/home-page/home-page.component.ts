import { Component } from '@angular/core';
import {RegisterOrLoginComponent} from "../register-or-login/register-or-login.component";
import {HeroSectionHomeComponent} from "../hero-section-home/hero-section-home.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RegisterOrLoginComponent,
    HeroSectionHomeComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
