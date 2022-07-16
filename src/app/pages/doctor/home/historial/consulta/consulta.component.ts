import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { CrearConsultaComponent } from './crear-consulta/crear-consulta.component';
import { MostrarConsultaComponent } from './mostrar-consulta/mostrar-consulta.component';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  displayedColumns: string[] = ['estado_consulta','edad','peso','doctor','historial','id_consulta'];
  dataSource: MatTableDataSource<Consulta>;
  idHistorial: number;

  constructor(
    private route: ActivatedRoute,
    private consultaService: ConsultaService,
    public dialog: MatDialog,
    public dialogMostrar: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      console.log(data['id'])
      this.consultaService.consultaCambio.pipe(map((bsCon) => {
        return bsCon.filter( consult => consult.historialClinico.id_historial_clinico == data['id'] )
      }))
      .subscribe((data) => {                 
          this.dataSource = new MatTableDataSource(data);  
      }
      );
    });

    this.route.params.subscribe(data => {
      console.log(data['id']);
      this.idHistorial = data['id'];
      this.consultaService.listar().pipe(map((bsCon) => {
        return bsCon.filter( consult => consult.historialClinico.id_historial_clinico == data['id'] )
      }))
      .subscribe((data) => {       
        console.log(data)
        this.dataSource = new MatTableDataSource(data);  
      }
      );
    });   
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearConsultaComponent, {
      width: '50rem',
      data: this.idHistorial
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('esto vota ',result);
    });
  }

  openDialogMostrar(id: number): void {
    const dialogRef = this.dialog.open(MostrarConsultaComponent, {
      width: '50rem',
      data:{id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('esto vota ',result);
    });
  }

  filter(e: any): void{
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }
}
