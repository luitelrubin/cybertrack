import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
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
    password: new FormControl('')
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
