import { Cliente } from "./cliente";

export class Paciente{
    id_paciente: number;
    nombre_paciente: string;
    raza_pacinte: string;
    especie_paciente: string;
    color_paciente: string;
    cliente: Cliente;
}