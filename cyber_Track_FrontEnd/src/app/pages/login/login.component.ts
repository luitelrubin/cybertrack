import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Fixed "styleUrl" to "styleUrls"
})
export class LoginComponent {
  isLogin = true; // Controls the login/signup toggle
  Signedup = false; // Tracks signup status
  email1: string = '';
  password1: string = '';
  email2: string = '';
  password2: string = '';

  // Login form
  HandleLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // Signup form
  HandleSignup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordRewrite: new FormControl('', [Validators.required])
  });

  constructor(private storage: LocalStorageService) {}

  ngOnInit(): void {
    // Placeholder for any initialization logic
  }

  LoginSubmit(): void {
    if (this.HandleLogin.valid) {
      this.email1 = this.HandleLogin.value.email ?? '';
      this.password1 = this.HandleLogin.value.password ?? '';

      console.log('Login Email:', this.email1);
      this.storage.store('username', this.email1); // Storing username in local storage

      this.HandleLogin.reset(); // Reset the form after submission
    } else {
      console.error('Invalid Login Form');
    }
  }

  SignupSubmit(): void {
    if (this.HandleSignup.valid) {
      this.email2 = this.HandleSignup.value.email ?? '';
      this.password2 = this.HandleSignup.value.password ?? '';
      const passwordRewrite = this.HandleSignup.value.passwordRewrite ?? '';

      // Check if passwords match
      if (this.password2 !== passwordRewrite) {
        console.error('Passwords do not match');
        return;
      }

      console.log('Signup Email:', this.email2);
      this.Signedup = true; // Mark as signed up
      this.isLogin = true; // Switch back to login

      this.HandleSignup.reset(); // Reset the form after successful submission
    } else {
      console.error('Invalid Signup Form');
    }
  }
}