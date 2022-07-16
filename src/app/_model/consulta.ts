import { Doctor } from "./doctor";
import { Historial } from "./historia";

export class Consulta{
    id_consulta: number;
    estado_consulta: string;
    antecedente_consulta: string;
    examen_consulta: string;
    diagnostico_consulta: string;
    edad: number;
    peso: number;
    doctor: Doctor;
    historialClinico: Historial;
}