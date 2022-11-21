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
  nombreTarea : string = ""; // Setea el nombre a traves del ngModel colocado en el input que hace un doble binding
  
  constructor() { }

  ngOnInit(): void {
    this.getListaTareas(); // Verifica si hay Tareas guardadas en el SessionStorage
  }

  getListaTareas(){
    let storedList = sessionStorage.getItem('list');
    if(storedList == null)
      this.listaTareas = [];
    else 
      this.listaTareas = JSON.parse(storedList);
  }
  setSessionStorage(list : Tarea[]){
    sessionStorage.setItem('list', JSON.stringify(list)); // Guardo la stareas en el SessionStorage
  }
  agregarTarea() : void{
    const tarea: Tarea = { // Inicializo propiedades de la clase Tarea, comenzando con un estado en false
      nombre: this.nombreTarea,
      estado: false
    }
    this.listaTareas.push(tarea); // Agrego la tarea a la lista de tareas
    this.setSessionStorage(this.listaTareas); // Guardo la lista de tareas en el Session Storage
    this.nombreTarea = ''; // Reseteo la propiedad nombreTarea para que aparezca en blanco en el input
  }
  eliminar(i: number):void{
    this.listaTareas.splice(i, 1);
    this.setSessionStorage(this.listaTareas); // Guardo la lista de tareas actualizada en el Session Storage 
  }
  actualizarTarea(tarea: Tarea, i: number):void{
    this.listaTareas[i].estado = !tarea.estado;
    this.setSessionStorage(this.listaTareas); // Guardo la lista de tareas actualizada en el Session Storage
  }
}
