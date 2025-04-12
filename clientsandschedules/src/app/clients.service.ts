import { Injectable } from '@angular/core';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  readonly url = 'http://localhost:3000/clients';

  constructor() { }

  async getAllClientsList(): Promise<Client[]> {
    const data = await fetch(this.url);
    const results = await data.json();
    return  results ?? [];
  }

  async getClientById(id: number): Promise<Client>{
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  
}
