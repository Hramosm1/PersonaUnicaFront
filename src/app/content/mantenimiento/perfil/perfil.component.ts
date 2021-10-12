import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';

@Component({
  selector: 'prx-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  constructor(private activateRoute: ActivatedRoute, private api: ApiService) {}
  perfil: any;

  ngOnInit(): void {
    this.getPerfil();
  }
  private getPerfil() {
    this.activateRoute.params.subscribe((params) => {
      this.api.GetPerfil(params.id).subscribe((perfil) => {
        this.perfil = {
          id: perfil.id,
          fechaCreacion: perfil.fecha_creacion,
          nombreEjecutivo: perfil.nombre_ejecutivo,
          json: JSON.parse(perfil.respuesta_json),
        };
      });
    });
  }
}
