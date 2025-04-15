import { Injectable } from '@angular/core';
import { Client } from './client';
import { Meeting } from './meeting';
import { MeetingsComponent } from './meetings/meetings.component';

@Injectable({
  providedIn: 'root'
})
export class ClientsAndMeetingsService {

  readonly url = 'http://localhost:3000/clients';
  allMeetings: Meeting[] = [];
  allClients: Client[] = [];
  constructor() { }

  async getAllClientsList(): Promise<Client[]> {
    if (this.allClients.length === 0) {
      const data = await fetch(this.url);
      this.allClients = await data.json();
    }
    return this.allClients ?? [];
  }

  updateClientsList(clientlist: Client[]){
    this.allClients = clientlist;
  }

  async getClientById(id: number): Promise<Client> {    
    const data = await fetch(`${this.url}/${id}`);
    const result = await data.json(); 
    return result ?? {};
  }

  getClientNameById(id:number): string {
    let result: string ='';
    if (this.allClients.length !== 0) {
      const data: Client[] = this.allClients.filter(client => Number(client.id) === Number(id));
      result = data[0].name;
    }
    return result;
  }

  getAllMeetingsList(): Meeting[]{
    return this.allMeetings;
  }

  getMeetingByClientId(clientid: number){
    this.allMeetings = this.allMeetings.filter( meeting => meeting.clientid === clientid);
  }

  getMeetingById(id: number){
    this.allMeetings = this.allMeetings.filter(meeting => meeting.id === id);
  }
  
}
