import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from '../_model/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  url:string = 'http://localhost:8080/pacientes';
  constructor(
    protected http: HttpClient
  ) { }

  listar(){
    return this.http.get<Paciente[]>(this.url);
  }

  registrar(pacien: Paciente){
    return this.http.post(this.url,pacien);
  }
}
