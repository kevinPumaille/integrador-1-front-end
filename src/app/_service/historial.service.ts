import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Historial } from '../_model/historia';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  historialCambio: Subject<Historial[]> = new Subject<Historial[]>();
  url:string = 'http://localhost:8080/historial';

  constructor(
    protected http: HttpClient
  ) { }

  listar(){
    return this.http.get<Historial[]>(this.url);
  }

  registrar(historial: Historial){
    return this.http.post(this.url,historial);
  }
}
