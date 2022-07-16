import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';

@Component({
  selector: 'app-mostrar-consulta',
  templateUrl: './mostrar-consulta.component.html',
  styleUrls: ['./mostrar-consulta.component.css']
})
export class MostrarConsultaComponent implements OnInit {

  form: FormGroup;
  estado: string;
  antecedente: string;
  examen: string;
  diagnostico: string;
  peso: number;
  edad: number;

  constructor(
    public dialogRefCrear: MatDialogRef<MostrarConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public dataId: number,
    private consultaService: ConsultaService
  ) { }

  ngOnInit(): void {
    console.log(this.dataId['id'])
    this.consultaService.listar().pipe(map(data => {
      return data.filter( dat => dat.id_consulta == this.dataId['id'])
    }))
    .subscribe(consul => {
      console.log(consul);

      this.estado = consul[0].estado_consulta;
      this.antecedente = consul[0].antecedente_consulta;
      this.examen = consul[0].examen_consulta;
      this.diagnostico = consul[0].diagnostico_consulta;
      this.peso = consul[0].peso;
      this.edad = consul[0].edad;
    })
  }

  operar(): void{

  }

}
