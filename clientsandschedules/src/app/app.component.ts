import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ClientsAndMeetingsService } from './clientsandmeetings.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {

  title = 'clientsandschedules';
  service = inject(ClientsAndMeetingsService);


  logOut() {
    sessionStorage.clear();
    window.location.href="/home";
  }

}
