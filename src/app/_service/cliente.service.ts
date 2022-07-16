import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../_model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url:string = 'http://localhost:8080/clientes';
  constructor(
    protected http: HttpClient
  ) { }

  listar(){
    return this.http.get<Cliente[]>(this.url);
  }

  registrar(client: Cliente){
    return this.http.post(this.url,client);
  }
}
