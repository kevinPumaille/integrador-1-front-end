import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../_model/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  
  url:string = 'http://localhost:8080/doctores';
  constructor(protected http: HttpClient) { }

  listar(){
    return this.http.get<Doctor[]>(this.url);
  }
}
