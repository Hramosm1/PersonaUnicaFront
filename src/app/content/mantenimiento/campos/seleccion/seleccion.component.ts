import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'prx-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.scss']
})
export class SeleccionComponent implements OnInit {
  opciones: string[] = []
  nuevaOpcion: string = ''
  icon = faPlus
  constructor() { }

  ngOnInit(): void {
  }
  agregarOpcion() {
    this.opciones.push(this.nuevaOpcion)
    this.nuevaOpcion = ''
  }
}
