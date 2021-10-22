import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import {
  Empresas,
  Generos,
  TiposContacto,
  TiposDocumento,
  TiposOrigen,
  TiposPaginaWeb,
  TiposPersona,
  TiposTelefono,
} from '@app/content/mantenimiento/inputs/models';
import { Perfil } from '../tablas-model';

@Component({
  selector: 'prx-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  constructor(private activateRoute: ActivatedRoute, private api: ApiService, private fb: FormBuilder) {}
  perfil: Perfil;
  tiposDocumento: TiposDocumento[];
  tiposPaginaWeb: TiposPaginaWeb[];
  Generos: Generos[];
  tiposContacto: TiposContacto[];
  tiposOrigen: TiposOrigen[];
  tiposPersona: TiposPersona[];
  tiposTelefono: TiposTelefono[];
  empresas: Empresas[];
  perfilForm: FormGroup;
  dis: boolean = true;
  campos = [
    { titulo: 'Primer apellido', campo: 'primerApellido' },
    { titulo: 'Segundo apellido', campo: 'segundoApellido' },
    { titulo: 'Fecha nacimiento / creación', campo: 'fecha' },
    { titulo: 'Género', campo: 'genero' },
    { titulo: 'Razón social', campo: 'razonSocial' },
    { titulo: 'Observaciones', campo: 'observaciones' },
  ];

  ngOnInit(): void {
    this.getPerfil();
    this.getTipos();
    this.perfilForm = this.fb.group({
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      fecha: ['', Validators.required],
      genero: [Number, Validators.required],
      observaciones: [''],
      razonSocial: [''],
    });
  }
  change() {
    if (this.dis) {
      this.perfilForm.controls.primerApellido.enable();
      this.perfilForm.controls.segundoApellido.enable();
      this.perfilForm.controls.fecha.enable();
      this.perfilForm.controls.genero.enable();
      this.perfilForm.controls.razonSocial.enable();
      this.perfilForm.controls.observaciones.enable();
    } else {
      this.api.updatePerfil(this.perfil.id, this.perfilForm.value).subscribe((res) => this.actualizar());
      this.perfilForm.controls.primerApellido.disable();
      this.perfilForm.controls.segundoApellido.disable();
      this.perfilForm.controls.fecha.disable();
      this.perfilForm.controls.genero.disable();
      this.perfilForm.controls.razonSocial.disable();
      this.perfilForm.controls.observaciones.disable();
    }
    this.dis = !this.dis;
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
  actualizar(e?: any) {
    this.getPerfil();
  }
  private getPerfil() {
    this.activateRoute.params.subscribe((params) => {
      this.api.GetPerfil(params.id).subscribe((perfil: Perfil) => {
        console.log(perfil);
        this.perfil = perfil;
        this.perfilForm.get('primerApellido').setValue(perfil.primerApellido);
        this.perfilForm.get('segundoApellido').setValue(perfil.segundoApellido);
        this.perfilForm.get('fecha').setValue(new Date(perfil.fecha).toLocaleDateString());
        this.perfilForm.get('genero').setValue(perfil.genero);
        this.perfilForm.get('observaciones').setValue(perfil.observaciones);
        this.perfilForm.get('razonSocial').setValue(perfil.razonSocial);
        this.perfilForm.controls.primerApellido.disable();
        this.perfilForm.controls.segundoApellido.disable();
        this.perfilForm.controls.fecha.disable();
        this.perfilForm.controls.genero.disable();
        this.perfilForm.controls.razonSocial.disable();
        this.perfilForm.controls.observaciones.disable();
      });
    });
  }
}
