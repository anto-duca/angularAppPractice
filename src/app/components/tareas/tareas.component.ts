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
    this.getListaTareas();
  }

  agregarTarea() : void{
    const tarea: Tarea = { //esto lo pudimos hacer gracias al constructor del modelo Tarea
      nombre: this.nombreTarea,
      estado: false
    }
    this.listaTareas.push(tarea); //agrego la tarea a la lista de tareas
    this.setSessionStorage(this.listaTareas)
    this.nombreTarea = ''; //reseteamos la tarea
  }

  eliminar(i: number, nombre : string):void{
    this.listaTareas.splice(i, 1);
    this.setSessionStorage(this.listaTareas)
  }

  actualizarTarea(tarea: Tarea, i: number):void{
    this.listaTareas[i].estado = !tarea.estado;
    this.setSessionStorage(this.listaTareas)

  }

  setSessionStorage(list : Tarea[]){
    sessionStorage.setItem('list', JSON.stringify(list))
  }

  getListaTareas(){
    let storedList = sessionStorage.getItem('list');
    if(storedList == null)
      this.listaTareas = [];
    else 
      this.listaTareas = JSON.parse(storedList);
  }
}
