import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { mixinDisabled } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Consulta } from 'src/app/_model/consulta';
import { Historial } from 'src/app/_model/historia';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { DoctorService } from 'src/app/_service/doctor.service';
import { HistorialService } from 'src/app/_service/historial.service';

@Component({
  selector: 'app-crear-consulta',
  templateUrl: './crear-consulta.component.html',
  styleUrls: ['./crear-consulta.component.css']
})
export class CrearConsultaComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRefCrear: MatDialogRef<CrearConsultaComponent>, 
    @Inject(MAT_DIALOG_DATA) public dataId: number,
    private historialService: HistorialService,
    private doctorService: DoctorService,
    private consultaService: ConsultaService
  ) { }

  ngOnInit(): void {
    //console.log(this.dataId+"crear HERE")
    this.form = new FormGroup({
      'id_consulta': new FormControl(''),
      'estado_consulta':new FormControl(''),
      'antecedente_consulta':new FormControl(''),
      'examen_consulta':new FormControl(''),
      'diagnostico_consulta':new FormControl(''),
      'edad':new FormControl(0),      
      'peso':new FormControl(0),     
    });
  }

  operar(){
    console.log(this.form.value);
    let usuDoctor = JSON.parse(localStorage.getItem('Login')).doctor;


    this.historialService.listar().pipe(map(data =>{
      return data.filter(dat => dat.id_historial_clinico == this.dataId)
    }))
    .subscribe(historial => {      
      this.doctorService.listar().pipe(map(data => {
        return data.filter(dat => dat.usuario == usuDoctor)
      }))
      .subscribe(doctor =>{
        //console.log(doctor)
        //console.log(historial)

        let consulta = new Consulta();
        consulta.id_consulta = this.form.value['id_consulta'];
        consulta.estado_consulta = this.form.value['estado_consulta'];
        consulta.antecedente_consulta = this.form.value['antecedente_consulta'];
        consulta.examen_consulta = this.form.value['examen_consulta'];
        consulta.diagnostico_consulta = this.form.value['diagnostico_consulta'];
        consulta.edad = this.form.value['edad'];
        consulta.peso = this.form.value['peso'];
        consulta.doctor = doctor[0];
        consulta.historialClinico = historial[0];

        console.log(consulta);
        this.consultaService.registrar(consulta).subscribe(() =>{
          this.consultaService.listar().subscribe(data =>{
            this.consultaService.consultaCambio.next(data);
          })
        });
      })
    }) 
    
    


  
    this.dialogRefCrear.close();
  }

  onNoClick(): void {
    this.dialogRefCrear.close();
  }

}
