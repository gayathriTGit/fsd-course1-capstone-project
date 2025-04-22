import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Meeting } from '../meeting';
import { ClientsAndMeetingsService } from '../clientsandmeetings.service';
import { format } from 'path';
import { Client } from '../client';
import { resourceUsage } from 'process';

@Component({
  selector: 'app-meetings',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './meetings.component.html',
  styleUrl: './meetings.component.css'
})
export class MeetingsComponent {

  meetingService = inject(ClientsAndMeetingsService);
  allMeetings: Meeting[] = this.meetingService.getAllMeetingsList();
  allClients: Client[] = [];

    // Initialize the form controls
    meetingForm = new FormGroup({
      clientid: new FormControl(0),
      clientname: new FormControl(''),
      topic: new FormControl(''),
      noofpeople: new FormControl(0),
      starttime: new FormControl('')
    });

  constructor() {

    // Get all clients data from the json server https://localhost:3000/clients
    if (this.allClients.length === 0) {      
      this.meetingService.getAllClientsList().then((clientsList: Client[])=>{
        this.allClients = clientsList;    
      });   
    } 
  }

  addMeeting(){

    // Identify if the meeting data is being added or updated
    const btnSubmit = document.getElementById("btn-submit");
    let givenId: number = this.allClients.length + 1;
    if (btnSubmit && btnSubmit.textContent === `Update Meeting`) {

      // Before updating data remove the existing meeting data from the array
      const meetingId = btnSubmit.getAttribute('value');
      givenId = Number(meetingId);
      this.allMeetings = this.allMeetings.filter(item => Number(item.id) !== Number(meetingId));

      // Reset the submit button and div captions 
      const divAddMeeting = document.getElementById("add-meeting") as HTMLDivElement ;
      if (divAddMeeting){
        divAddMeeting.textContent = `Schedule a New Meeting`;
      }
      btnSubmit.textContent = `Schedule`;
    }

    let clientName = this.meetingService.getClientNameById(this.meetingForm.value.clientid ?? 0);
    
    // Add the current meeting data to the array of meetings
    const tmpMeeting: Meeting = {
      id: this.allMeetings.length +1,
      clientid: this.meetingForm.value.clientid ?? 0,
      clientname: clientName,
      topic: this.meetingForm.value.topic ?? '',
      noofpeople: this.meetingForm.value.noofpeople ?? 0,
      starttime: this.meetingForm.value.starttime ?? ''
    }
    this.allMeetings.push(tmpMeeting);

    //Clear the form data
    this.meetingForm.patchValue({
      clientid: 0,
      clientname: '',
      topic: '',
      noofpeople: 0,
      starttime: ''
    });
  }

  displayMeetingTimeasUTCString(dateTimeLocale: string) {  
    
    // Request a weekday along with a long date
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const options1: Intl.DateTimeFormatOptions = {
      timeStyle: "short"
    };
    const d = new Date(dateTimeLocale);
    return `${d.toLocaleDateString("en-US", options)} ${d.toLocaleTimeString("en-US", options1)}` ;
  }

  editMeeting(meetingId: number){
    this.allMeetings.map((meeting)=> {
      if (meeting.id === meetingId) {
        this.meetingForm.patchValue({
          clientid: meeting.clientid,
          topic: meeting.topic,
          noofpeople: meeting.noofpeople,
          starttime: meeting.starttime
        });

        // Change div header caption to reflect client data updation
        const divAddClient = document.getElementById("add-meeting") as HTMLDivElement ;
        if (divAddClient){
          divAddClient.textContent = `Update '${meeting.clientname}' meeting`;
        }

        // Change button caption to reflect client data updation
        const btnSubmit = document.getElementById("btn-submit");
        if (btnSubmit) {
          btnSubmit.textContent = `Update Meeting`;

          // Save client id in value attribute for use by addClient() function
          btnSubmit.setAttribute('value', meeting.id.toString());

        }
      }
    });
  }

  deleteMeeting(meetingId: number){
    this.allMeetings = this.allMeetings.filter(meeting => meeting.id !== meetingId);
  }
  
}

