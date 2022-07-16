import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/doctor/home/home.component';
import { NavBarComponent } from './pages/doctor/nav-bar/nav-bar.component';
import { PacienteComponent } from './pages/doctor/home/paciente/paciente.component';
import { ClienteComponent } from './pages/doctor/home/cliente/cliente.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HistorialComponent } from './pages/doctor/home/historial/historial.component';
import { ConsultaComponent } from './pages/doctor/home/historial/consulta/consulta.component';
import { CrearHistorialComponent } from './pages/doctor/home/historial/crear-historial/crear-historial.component';
import { MostrarConsultaComponent } from './pages/doctor/home/historial/consulta/mostrar-consulta/mostrar-consulta.component';
import { CrearConsultaComponent } from './pages/doctor/home/historial/consulta/crear-consulta/crear-consulta.component';
@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    ClienteComponent,
    HomePagesComponent,
    HomeComponent,
    NavBarComponent,
    PacienteComponent,    
    HistorialComponent, ConsultaComponent, CrearHistorialComponent, MostrarConsultaComponent, CrearConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MaterialModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
