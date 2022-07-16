import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Consulta } from '../_model/consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  consultaCambio: Subject<Consulta[]> = new Subject<Consulta[]>();
  url:string = 'http://localhost:8080/consulta';
  constructor(protected http: HttpClient) { }

  listar(){
    return this.http.get<Consulta[]>(this.url);
  }

  registrar(consulta: Consulta){
    return this.http.post<Consulta>(this.url,consulta);
  }
}
