import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './pages/doctor/doctor.component';
import { ClienteComponent } from './pages/doctor/home/cliente/cliente.component';
import { ConsultaComponent } from './pages/doctor/home/historial/consulta/consulta.component';
import { HistorialComponent } from './pages/doctor/home/historial/historial.component';
import { HomeComponent } from './pages/doctor/home/home.component';
import { PacienteComponent } from './pages/doctor/home/paciente/paciente.component';
import { HomePagesComponent } from './pages/home-pages/home-pages.component';

const routes: Routes = [
  {path: '', component:HomePagesComponent},
  {path: 'doctor', component:DoctorComponent},
  {path: 'homedoctor', component:HomeComponent,children:[
    {path:'cliente',component:ClienteComponent},
    {path:'paciente',component:PacienteComponent},    
    {path:'historial',component:HistorialComponent,children:[
      {path:'historia/:id',component:ConsultaComponent},    
    ]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
