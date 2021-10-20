import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { Avatar } from '@app/blocks/avatars/models/avatar';
import {
  Generos,
  TiposContacto,
  TiposDocumento,
  TiposOrigen,
  TiposPaginaWeb,
  TiposPersona,
  TiposTelefono,
} from '@app/content/mantenimiento/inputs/models';
import { Observable } from 'rxjs';
import { Perfil } from '../tablas-model';

@Component({
  selector: 'prx-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  constructor(private activateRoute: ActivatedRoute, private api: ApiService) {}
  perfil: Perfil;
  avatar: Avatar;
  tiposDocumento: TiposDocumento[];
  tiposPaginaWeb: TiposPaginaWeb[];
  Generos: Generos[];
  tiposContacto: TiposContacto[];
  tiposOrigen: TiposOrigen[];
  tiposPersona: TiposPersona[];
  tiposTelefono: TiposTelefono[];

  ngOnInit(): void {
    this.getPerfil();
    this.getTipos();
  }
  getTipos() {
    this.api.getTipos<TiposDocumento>('documento').subscribe((res) => (this.tiposDocumento = res));
    this.api.getTipos<TiposPaginaWeb>('pagina').subscribe((res) => (this.tiposPaginaWeb = res));
    this.api.getTipos<Generos>('genero').subscribe((res) => (this.Generos = res));
    this.api.getTipos<TiposContacto>('contacto').subscribe((res) => (this.tiposContacto = res));
    this.api.getTipos<TiposOrigen>('origen').subscribe((res) => (this.tiposOrigen = res));
    this.api.getTipos<TiposPersona>('persona').subscribe((res) => (this.tiposPersona = res));
    this.api.getTipos<TiposTelefono>('telefono').subscribe((res) => (this.tiposTelefono = res));
  }
  get nombres() {
    return this.perfil.PU_Nombres.map((nom) => nom.nombre);
  }
  get fecha() {
    return new Date(this.perfil.fecha).toLocaleDateString();
  }
  get empleos() {
    return this.perfil.empleos;
  }
  actualizar(e: any) {
    console.log('actualizo');
    this.getPerfil();
  }
  private getPerfil() {
    this.activateRoute.params.subscribe((params) => {
      this.api.GetPerfil(params.id).subscribe((perfil: Perfil) => {
        console.log(perfil);
        this.perfil = perfil;
        this.avatar = {
          name: `${this.nombres.join(' ')} ${perfil.primerApellido} ${perfil.segundoApellido}`,
          status: perfil.personaUnica ? 'Perfil unico' : 'Perfil sin documento',
        };
      });
    });
  }
}
