import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLogin = true;
  Signedup= false;
  email1: string='';
  password1: string='';
  HandleLogin = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor() {}

  LoginSubmit(){
    this.email1 = this.HandleLogin.value.email?? '';
    this.password1 = this.HandleLogin.value.password?? '';
    this.HandleLogin.reset();
    console.log(this.email1);
  }
  email2: string='';
  password2: string='';

  HandleSignup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    passwordRewrite: new FormControl('')
  });

  SignupSubmit(){
    this.email2 = this.HandleSignup.value.email?? '';
    this.password2 = this.HandleSignup.value.password?? '';
    this.HandleSignup.reset();
    this.Signedup=true;
    this.isLogin=true;
    console.log(this.email1);
  }


}
