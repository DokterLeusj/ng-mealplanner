import { Component } from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register-or-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register-or-login-form.component.html',
  styleUrl: './register-or-login-form.component.css'
})
export class RegisterOrLoginFormComponent {
  showingPassword:boolean=false;
  toggleRegisterNotLogin: boolean = true;

  changeToggleRegisterNotLogin(): void {
    this.toggleRegisterNotLogin = !this.toggleRegisterNotLogin;
  }
    // Form
  userInputEmail = new FormControl("");
  userInputPassword = new FormControl("");


  getPasswordType(): string {
    return this.showingPassword ? 'text' : 'password';
  }
  toggleShowingPassword(): void {
    this.showingPassword = !this.showingPassword;
  }

}
