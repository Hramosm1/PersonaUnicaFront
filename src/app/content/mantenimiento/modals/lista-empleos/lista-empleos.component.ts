import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/@core';
import { Empresas } from '../../inputs/models';

@Component({
  selector: 'prx-lista-empleos',
  templateUrl: './lista-empleos.component.html',
  styleUrls: ['./lista-empleos.component.scss'],
})
export class ListaEmpleosComponent implements OnInit {
  empleos: Empresas[];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getEmpresas().subscribe((res) => console.log(res));
  }
}
