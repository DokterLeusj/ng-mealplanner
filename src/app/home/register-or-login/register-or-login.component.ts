import {Component} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule, Validators,
} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

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
   credentialsForm = new FormGroup({
    userRegisterEmail: new FormControl("", [Validators.email, Validators.required]),
    userRegisterPassword: new FormControl("", [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)])
  });

  isRegisterNotLogin: boolean = true;
  showingPassword: boolean = false;
  isButtonActionClicked: boolean = false;
  isActionSuccessful: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  changeToggleRegisterNotLogin(): void {
    this.isRegisterNotLogin = !this.isRegisterNotLogin; // Login not implemented yet
  }

  toggleShowingPassword(): void {
    this.showingPassword = !this.showingPassword;
  }

  getPasswordType(): string {
    return this.showingPassword ? 'text' : 'password';
  }

  runActionButtonMethods(): void {
    this.isButtonActionClicked = true;
    if (this.credentialsForm.valid) {
      const email: string | null = this.credentialsForm.controls.userRegisterEmail.value;
      const password: string | null = this.credentialsForm.controls.userRegisterPassword.value;
      if (email && password) {
        try {
          this.isRegisterNotLogin ? this.authService.attemptRegister(email, password) : this.authService.attemptLogin(email, password);
          this.isActionSuccessful = true;
        } catch (e) {
          this.isActionSuccessful = false;
        }

        this.router.navigate(['/']) // After successful login, redirect to homepage

      }
    }
  }
}
