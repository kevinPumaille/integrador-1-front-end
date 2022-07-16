import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, find, map, pipe } from 'rxjs';
import { Cliente } from 'src/app/_model/cliente';
import { Historial } from 'src/app/_model/historia';
import { Paciente } from 'src/app/_model/paciente';
import { ClienteService } from 'src/app/_service/cliente.service';
import { HistorialService } from 'src/app/_service/historial.service';
import { PacienteService } from 'src/app/_service/paciente.service';

export interface FormHistorial {
  nombrePaciente: string;
  especiePaciente: string;
  colorPaciente:string;
  razaPaciente:string;
  dniCliente:string;
}

@Component({
  selector: 'app-crear-historial',
  templateUrl: './crear-historial.component.html',
  styleUrls: ['./crear-historial.component.css']
})
export class CrearHistorialComponent implements OnInit {

  form: FormGroup;
  
  pacien: Paciente;

  constructor(
    public dialogRef: MatDialogRef<CrearHistorialComponent>,   
    private historialService: HistorialService,
    private clienteService: ClienteService,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id_cliente': new FormControl(''),
      'dni_cliente':new FormControl(0),
      'nombre_cliente':new FormControl(''),
      'apellido_cliente':new FormControl(''),
      'correo_cliente':new FormControl(''),
      'direccion_cliente':new FormControl(''),      
      'telefono_cliente':new FormControl(0),     
      'id_paciente': new FormControl(''), 
      'nombre_paciente': new FormControl(''), 
      'raza_pacinte': new FormControl(''), 
      'especie_paciente': new FormControl(''), 
      'color_paciente': new FormControl(''),
    });
    
  }
  
  async operar(){
    /* this.buscarCliente();    
    let historial = new Historial();
    historial.id_historial_clinico = this.form.value['dniCliente'];
    
    console.log(this.form.value['dniCliente']) */
    let objCliente = new Cliente();
    objCliente.id_cliente = this.form.value['id_cliente'];
    objCliente.dni_cliente = this.form.value['dni_cliente'];
    objCliente.nombre_cliente = this.form.value['nombre_cliente'];
    objCliente.apellido_cliente = this.form.value['apellido_cliente'];
    objCliente.correo_cliente = this.form.value['correo_cliente'];
    objCliente.direccion_cliente = this.form.value['direccion_cliente'];
    objCliente.telefono_cliente = this.form.value['telefono_cliente'];
    //console.log(objCliente);

    this.clienteService.registrar(objCliente).subscribe(()=>{
      this.clienteService.listar().pipe(map( dat => {
        return dat.find(cli => cli.dni_cliente == parseInt(this.form.value['dni_cliente']))
      }))
      .subscribe(data => {
        let objPaciente = new Paciente();
        objPaciente.id_paciente = this.form.value['id_paciente'];
        objPaciente.nombre_paciente = this.form.value['nombre_paciente'];
        objPaciente.raza_pacinte = this.form.value['raza_pacinte'];
        objPaciente.especie_paciente = this.form.value['especie_paciente'];
        objPaciente.color_paciente = this.form.value['color_paciente'];
        objPaciente.cliente = data;

        this.pacienteService.registrar(objPaciente).subscribe(() => {
          this.pacienteService.listar().pipe(map(obj => {
            return obj.find(da => da.cliente.dni_cliente == parseInt(this.form.value['dni_cliente']) && da.nombre_paciente == this.form.value['nombre_paciente'])
          }))
          .subscribe(data => {
            let historial = new Historial();
            historial.id_historial_clinico = this.form.value['id_paciente'];
            historial.paciente = data;      
            this.historialService.registrar(historial).subscribe(()=>{
              this.historialService.listar().subscribe(dat => {
                this.historialService.historialCambio.next(dat);
              })
            });

            console.log(historial);  
          }) 
        }); 
      })
    });
    
    this.dialogRef.close();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
