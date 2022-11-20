import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/models/tarea';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  texto : string = "Ingrese la tarea... ";
  listaTareas : Tarea[] = [];
  nombreTarea : string = ""; // ngModel
  
  constructor() { }

  ngOnInit(): void {
  }

  agregarTarea() : void{
    const tarea: Tarea = { //esto lo pudimos hacer gracias al constructor del modelo Tarea
      nombre: this.nombreTarea,
      estado: false
    }
    this.listaTareas.push(tarea); //agrego la tarea a la lista de tareas
    this.nombreTarea = ''; //reseteamos la tarea
  }

  eliminar(i: number):void{
    this.listaTareas.splice(i, 1)
  }

  actualizarTarea(tarea: Tarea, i: number):void{
    this.listaTareas[i].estado = !tarea.estado;
  }
}
