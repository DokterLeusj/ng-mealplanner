import { Component } from '@angular/core';
import {RegisterOrLoginComponent} from "../register-or-login/register-or-login.component";

@Component({
  selector: 'app-hero-section-home',
  standalone: true,
  imports: [
    RegisterOrLoginComponent
  ],
  templateUrl: './hero-section-home.component.html',
  styleUrl: './hero-section-home.component.css'
})
export class HeroSectionHomeComponent {

}
