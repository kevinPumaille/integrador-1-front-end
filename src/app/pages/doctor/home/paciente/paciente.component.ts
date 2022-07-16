import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, switchMap } from 'rxjs';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteTable } from 'src/app/_model/pacienteTable';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  dataSource: MatTableDataSource<PacienteTable>;
  displayedColumns: string[] = ['id_paciente', 'nombre_paciente', 'raza_pacinte', 'especie_paciente', 'color_paciente','dni_cliente'];

  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.pacienteService.listar().pipe(map((ndata)=>{      
      return ndata.map((pro)=>{
        if(pro.cliente){
          return {...pro,dni_cliente:pro.cliente.dni_cliente}
        }
        return pro
      });    
    }))    
    .subscribe((data:any)=>{
      // console.log(data) 
      this.dataSource = new MatTableDataSource(data);  
    });
  }

  filter(e: any): void{
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

}
