import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/_model/cliente';
import { ClienteService } from 'src/app/_service/cliente.service';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})

export class ClienteComponent implements OnInit {
  
  dataSource: MatTableDataSource<Cliente>;
  displayedColumns: string[] = ['id_cliente', 'dni_cliente', 'nombre_cliente', 'apellido_cliente', 'correo_cliente','direccion_cliente', 'telefono_cliente'];

  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.clienteService.listar().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);    
    });
  }

  
  filter(e: any): void{
    this.dataSource.filter = e.target.value.trim().toLowerCase();
  }
}
