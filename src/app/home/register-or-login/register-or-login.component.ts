import {Component} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule, Validators,
} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-register-or-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './register-or-login.component.html',
  styleUrl: './register-or-login.component.css'
})
export class RegisterOrLoginComponent {
   credentialsForm= new FormGroup({
    userRegisterEmail: new FormControl("",[Validators.email,Validators.required]),
    userRegisterPassword: new FormControl("",[Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)])
  });

  isRegisterNotLogin: boolean = true;
  showingPassword: boolean = false;
  isButtonActionClicked: boolean = false;

    changeToggleRegisterNotLogin(): void {
    // this.isRegisterNotLogin = !this.isRegisterNotLogin; // Login not implemented yet
  }

  toggleShowingPassword(): void {
    this.showingPassword = !this.showingPassword;
  }

  getPasswordType(): string {
    return this.showingPassword ? 'text' : 'password';
  }

  runActionButtonMethods(): void {
    this.isButtonActionClicked = true;
    this.isRegisterNotLogin ? this.attemptRegister() : this.attemptLogin();
  }

  attemptRegister() {
    // if email already registered, display error message
    // if email not registered yet, display registration successful & go to Home
  }

  attemptLogin() {
  }

  showErrorCredentialsValidation(): boolean {
    return this.isButtonActionClicked && !this.isValidCredentials();
  }

  getInvalidCredentialsMessage(): string {
    return "This email address is already in use."
  }
  getDisabledMessage():string {
    return "Please make all fields valid.";
  }
  isValidCredentials(): boolean {
    return false;
  }

  protected readonly console = console;
}
