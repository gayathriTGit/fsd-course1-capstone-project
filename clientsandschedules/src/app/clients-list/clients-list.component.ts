import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../client';
import { ClientsService } from '../clients.service';

@Component({
  selector: 'app-clients-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})
export class ClientsListComponent {

  clientService =  inject(ClientsService);
  allClients: Client[] = [];
  
  newClient: Client ={
    id:0,
    name:'',
    address1:'',
    address2:'',
    city:'',
    state:'',
    phone:'',
    email:'',
    username:'',
    password:''
  };

  constructor() {
    this.clientService.getAllClientsList().then((clientsList: Client[])=>{
      this.allClients = clientsList;    
    });
  }
  
  addClient(){
    const tmpClient: Client = {
      id: this.allClients.length + 1,
      name: this.newClient.name,
      address1: this.newClient.address1,
      address2: this.newClient.address2,
      city: this.newClient.city,
      state: this.newClient.state,
      phone: this.newClient.phone,
      email: this.newClient.email,
      username: this.newClient.username,
      password: this.newClient.password
    }
    this.allClients.push(tmpClient);
  }

  deleteClient(id: number){
    this.allClients = this.allClients.filter(client=>client.id !== id);  
  }
}
