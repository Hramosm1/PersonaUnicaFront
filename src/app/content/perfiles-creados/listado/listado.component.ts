import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/@core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Listado } from '../tablas-model';

import { finalize } from 'rxjs/operators';

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
  isLoading: boolean = true;
  ngOnInit(): void {
    this.api
      .GetPerfiles<Listado>()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((res) => {
        console.log(res);
        this.rows = res;
      });
  }
}
