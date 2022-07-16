import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { HistoriaTable } from 'src/app/_model/historiaTable';
import { HistorialService } from 'src/app/_service/historial.service';
import { CrearHistorialComponent } from './crear-historial/crear-historial.component';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  displayedColumns: string[] = ['NombrePaciente', 'DniCliente', 'NombreCliente','ApellidoCliente','Consultas'];
  dataSource: MatTableDataSource<HistoriaTable>;

  constructor(
    private historialService: HistorialService,
    public dialog: MatDialog,
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearHistorialComponent, {
      width: '50rem',
    });

    dialogRef.afterClosed().subscribe();
  }

  ngOnInit(): void {
    this.historialService.historialCambio.pipe(map((nadata)=>{
      return nadata.map((dat)=>{
        return {
          ...dat,
          nombrePaciente:dat.paciente.nombre_paciente,
          dniCliente:dat.paciente.cliente.dni_cliente,
          nombreCliente:dat.paciente.cliente.nombre_cliente,
          apellidoCliente:dat.paciente.cliente.apellido_cliente,        
        }
      })
    }))
    .subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);  
    });

    this.historialService.listar().pipe(map((nadata)=>{
      return nadata.map((dat)=>{
        return {
          ...dat,
          nombrePaciente:dat.paciente.nombre_paciente,
          dniCliente:dat.paciente.cliente.dni_cliente,
          nombreCliente:dat.paciente.cliente.nombre_cliente,
          apellidoCliente:dat.paciente.cliente.apellido_cliente,        
        }
      })
    }))
    .subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);  
    });
  }

  filter(e: any): void{
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }

}
