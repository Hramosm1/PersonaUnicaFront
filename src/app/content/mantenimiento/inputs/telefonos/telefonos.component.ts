import { Component, OnInit } from '@angular/core';
import { CodigosTelefono } from './telCodigos';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { TiposOrigen, TiposTelefono } from '../models';
import { Observable } from 'rxjs';
import { ApiService } from '@app/@core';

@Component({
  selector: 'prx-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.scss'],
})
export class TelefonosComponent implements OnInit {
  form: FormGroup;
  telExt = CodigosTelefono;
  tiposOrigen: Observable<Array<TiposOrigen>>;
  tiposTelefono: Observable<Array<TiposTelefono>>;
  constructor(private fb: FormBuilder, private rootForm: FormGroupDirective, private api: ApiService) {}
  ngOnInit(): void {
    this.form = this.rootForm.control;
    this.tiposTelefono = this.api.getTipos<TiposTelefono>('telefono');
    this.tiposOrigen = this.api.getTipos<TiposOrigen>('origen');
  }
  get telefonos() {
    return this.form.get('telefonos') as FormArray;
  }
  agregarTelefono() {
    this.telefonos.push(
      this.fb.group({
        codigoPais: ['+ 502', Validators.required],
        telefono: ['', Validators.required],
        tipoTelefono: [1, Validators.required],
        origenInformacion: [1, Validators.required],
      })
    );
  }

  quitarTelefono(i: number) {
    this.telefonos.removeAt(i);
  }
}
