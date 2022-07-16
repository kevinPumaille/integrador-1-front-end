import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Doctor } from 'src/app/_model/doctor';
import { DoctorService } from 'src/app/_service/doctor.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctores: Doctor[] = [];
  conexion: any = localStorage.getItem('Login');  

  checkoutForm = this.formBuilder.group({
    usuario:'',
    password:''
  });

  constructor(
    private doctorService: DoctorService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }
  
  onSubmit():void{

    this.doctores.filter((doc: Doctor)=>{
      if(doc.usuario == this.checkoutForm.value.usuario && doc.password == this.checkoutForm.value.password){
        this.conexion = false;

        localStorage.setItem('Login', JSON.stringify({login:'Ingreso',doctor:this.checkoutForm.value['usuario']}));
        this.router.navigate(['/homedoctor']);
        console.log(this.conexion)
        
      }
    });
    this.checkoutForm.reset();
  }
  
  ngOnInit(): void {
    console.log(this.conexion);
    this.doctorService.listar().subscribe(data => {
      this.doctores = data;          
    })
  }

}
