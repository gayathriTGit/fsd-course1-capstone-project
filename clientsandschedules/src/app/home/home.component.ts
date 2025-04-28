import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule, isPlatformBrowser  } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ClientsAndMeetingsService } from '../clientsandmeetings.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, LoginComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  service = inject(ClientsAndMeetingsService);
  loginSuccess: boolean = false;
  platformId: Object = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      if (sessionStorage != null){
        const login = sessionStorage.getItem('loginSuccess'); 
        this.loginSuccess = Boolean(login);
        this.service.loginSuccessful = this.loginSuccess;
      }
    }
    else {
      this.loginSuccess = this.service.loginSuccessful;
    }   
  }

  

}
