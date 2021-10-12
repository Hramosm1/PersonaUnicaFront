import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/@core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'prx-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
  constructor(private api: ApiService) {}
  cm = ColumnMode;
  rows: any[] = [];
  tipoDocumentos = {};
  ngOnInit(): void {
    this.api.getTiposDocumento().subscribe((tipos) => {
      tipos.forEach((tipo) => {
        this.tipoDocumentos[tipo.id] = tipo.tipo_documento;
      });
    });
    this.api.GetPerfiles().subscribe((res) => {
      this.rows = res.map((value) => {
        return {
          id: value.id,
          fechaCreacion: value.fecha_creacion,
          nombreEjecutivo: value.nombre_ejecutivo,
          json: JSON.parse(value.respuesta_json),
        };
      });
    });
  }
}
