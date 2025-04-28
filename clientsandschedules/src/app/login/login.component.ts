import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClientsAndMeetingsService } from '../clientsandmeetings.service';

@Component({
  selector: 'app-login',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  
  service = inject(ClientsAndMeetingsService);
  loginSuccess: boolean = false;
  platFormId: Object = inject(PLATFORM_ID);
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  constructor() {
    if (isPlatformBrowser(this.platFormId)){
      if (sessionStorage != null){
        const login = sessionStorage.getItem('loginSuccess'); 
        this.loginSuccess = Boolean(login);
      }
    }
    else {
      this.loginSuccess = this.service.loginSuccessful;
    }

    console.log(this.service.loginSuccessful, this.service.loginUserName);
    //this.signIn();
  }


  signIn() {
    
    if ((this.loginForm.value.userName === "anna@gmail.com") && (this.loginForm.value.password === "anna@456")) {
      this.service.loginSuccessful = true;
      this.service.loginUserName = this.loginForm.value.userName;
      this.service.loginPassword = this.loginForm.value.password;
      this.service.useSession = true;
      sessionStorage.setItem("loginSuccess", JSON.stringify(this.service.loginSuccessful));
      sessionStorage.setItem("loginUserName", this.service.loginUserName);
      sessionStorage.setItem("loginPassword", this.service.loginPassword);
      window.location.reload();

    }
    else {
      this.validateForm();
    }
  }

  validateForm(){
    if (this.loginForm.value.userName === "") {
      alert('Enter username');
      document.getElementById("username")?.focus();
    }
    else if (this.loginForm.value.password === ""){
      alert('Enter password');
      document.getElementById('password')?.focus();
    }
    else{
      this.service.loginSuccessful = false;
      alert('Login unsuccessful!')
    }  
  }
}
