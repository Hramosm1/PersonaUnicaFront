import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/@core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Listado } from '../tablas-model';

@Component({
  selector: 'prx-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  constructor(private api: ApiService) {}
  filtro: string = '';
  cm = ColumnMode;
  rows: Listado[] = [];
  getFecha(date: string) {
    return new Date(date).toLocaleDateString();
  }
  ngOnInit(): void {
    this.api.GetPerfiles<Listado>().subscribe((res) => {
      console.log(res);
      this.rows = res;
    });
  }
}
