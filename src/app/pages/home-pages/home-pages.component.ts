import { Component, OnInit } from '@angular/core';
import { ImgServicio } from 'src/app/_model/imgServicio';

@Component({
  selector: 'app-home-pages',
  templateUrl: './home-pages.component.html',
  styleUrls: ['./home-pages.component.css']
})
export class HomePagesComponent implements OnInit {

  lista: ImgServicio[] = [
    {path:'1',title:'Centro de vacunación y control de salud'},
    {path:'2',title:'Cirugia minima'},
    {path:'3',title:'Dermatologia'},
    {path:'4',title:'Diagnostico y tratamiento'},
    {path:'5',title:'Endoscopia canina'},
    {path:'6',title:'Farmacia'},
    {path:'7',title:'Hospitalización y cuidado critico'},
    {path:'8',title:'Laboratorio clinico'},
    {path:'9',title:'Medicina interna'},
    {path:'10',title:'Medicina reproductiva y manejo reproductivo'},
    {path:'11',title:'Odontologia'},
    {path:'12',title:'Oncologia'},
    {path:'13',title:'Radiologia'},
    {path:'14',title:'Servicio de baño y peluquería canina'},
    {path:'15',title:'Tienda de accesorios'},
    {path:'16',title:'Traumatologia y ortopedia'},
  
  ];  
  image = '../../../assets/homeImg/servicios/ser_';
  conexion: any =localStorage.getItem('Login'); 

  constructor() { }

  ngOnInit(): void {
  }

}