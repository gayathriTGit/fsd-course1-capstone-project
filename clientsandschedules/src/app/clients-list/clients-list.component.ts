import { booleanAttribute, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../client';
import { ClientsAndMeetingsService } from '../clientsandmeetings.service';

@Component({
  selector: 'app-clients-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css'
})

export class ClientsListComponent {

  // Inject Clients service into the Clients List component
  clientandMeetingService =  inject(ClientsAndMeetingsService);
  allClients: Client[] = [];

  
  // Initialize the form controls
  clientForm = new FormGroup({
    name: new FormControl(''),
    address: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password1: new FormControl(''),
    password2: new FormControl('')
  });

  constructor() {

    console.log(this.clientandMeetingService.loginSuccessful, this.clientandMeetingService.loginUserName);
    // Get all clients data from the json server https://localhost:3000/clients
    this.clientandMeetingService.getAllClientsList().then((clientsList: Client[])=>{
      this.allClients = clientsList;    
    });

  }
  
  /*------------------------------------------------------------------
  // Add or update given client data
  ------------------------------------------------------------------*/
  addClient(){
  
    if (this.validateForm() === false) {
      return;
    } 
    
    // Identify if the client data is being added or updated
    const btnSubmit = document.getElementById("btn-submit");
    let givenId: number = this.allClients.length + 1;
    if (btnSubmit && btnSubmit.textContent === `Update Client`) {

      // Before updating data remove the existing client data from the array
      const clientId = btnSubmit.getAttribute('value');
      givenId = Number(clientId);
      this.allClients = this.allClients.filter(item => Number(item.id) !== Number(clientId));

      // Reset the submit button and div captions 
      // const divAddClient = document.getElementById("add-client") as HTMLDivElement ;
      // if (divAddClient){
      //   divAddClient.textContent = `Add New Client`;
      // }
      btnSubmit.textContent = `Add Client`;

    }

    // Add the current client data to the array of clients
    const tmpClient: Client = {
      id: givenId,
      name: this.clientForm.value.name ?? '',
      address: this.clientForm.value.address  ?? '',
      phone: this.clientForm.value.phone ?? '',
      email: this.clientForm.value.email ?? '',
      username: this.clientForm.value.username ?? '',
      password1: this.clientForm.value.password1 ?? '',
      password2: this.clientForm.value.password2 ?? ''
    }    
    this.allClients.push(tmpClient);
    this.clientandMeetingService.allClients = this.allClients;
    
    // Clear the form data
    this.clientForm.patchValue( {
      name: '',
      address: '',
      phone: '',
      email: '',
      username: '',
      password1: '',
      password2: ''
    })

  }

  validateForm(): boolean{
    let returnValue: boolean = true;
    if (this.clientForm.value.name === ""){
      alert('Enter a name');
      document.getElementById("name")?.focus();
      returnValue = false;
    }
    else if(this.clientForm.value.address === ""){
      alert("Enter an address");
      document.getElementById("address")?.focus();
      returnValue = false;
    }
    else if(this.clientForm.value.phone === ""){
      alert("Enter a phone number");
      document.getElementById("phone")?.focus();
      returnValue = false;
    }
    else if(this.clientForm.value.email === ""){
      alert("Enter an email");
      document.getElementById("email")?.focus();
      returnValue = false;
    }
    else if(this.clientForm.value.username === ""){
      alert("Enter a username");
      document.getElementById("username")?.focus();
      returnValue = false;
    }
    else if(this.clientForm.value.password1 === ""){
      alert("Enter a password");
      document.getElementById("password1")?.focus();
      returnValue = false;
    }
    else if(this.clientForm.value.password2 === ""){
      alert(this.clientForm.value.password2);
      alert("Enter the password");
      document.getElementById("password2")?.focus();
      returnValue = false;
    }
    else if (this.clientForm.value.password1 !== this.clientForm.value.password2){
      alert("Password don't match. Reenter password");
      document.getElementById("password2")?.focus();
      returnValue = false;
    } 
    return returnValue;
  }

  /*------------------------------------------------------------------
  Delete the given client from the clients array
  --------------------------------------------------------------------*/
  deleteClient(id: number){
    this.allClients = this.allClients.filter(client=>client.id !== id);  
  }

  /*------------------------------------------------------------------
  Edit the given client data
  ------------------------------------------------------------------*/  
  editClient(id: number) {

    // Fill form with given client data
    this.allClients.map((client) => {
        if (client.id === id ) {
            this.clientForm.patchValue( {
              name: client.name,
              address: client.address,
              phone: client.phone,
              email: client.email,
              username: client.username,
              password1: client.password1,
              password2: client.password2
            })

            // Change div header caption to reflect client data updation
            // const divAddClient = document.getElementById("add-client") as HTMLDivElement ;
            // if (divAddClient){
            //   divAddClient.textContent = `Update '${client.name}' Client`;
            // }
    
            // Change button caption to reflect client data updation
            const btnSubmit = document.getElementById("btn-submit");
            if (btnSubmit) {
              btnSubmit.textContent = `Update Client`;

              // Save client id in value attribute for use by addClient() function
              btnSubmit.setAttribute('value', client.id.toString());
            }
        }
    });

  }

}
