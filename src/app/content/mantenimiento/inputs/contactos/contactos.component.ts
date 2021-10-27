import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ApiService } from '@app/@core';
import { Observable } from 'rxjs';
import { TiposContacto, TiposOrigen } from '../models';

@Component({
  selector: 'prx-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss'],
})
export class ContactosComponent implements OnInit {
  form: FormGroup;
  tiposContacto: Observable<TiposContacto[]>;
  tiposOrigen: Observable<TiposOrigen[]>;
  constructor(private fb: FormBuilder, private rootForm: FormGroupDirective, private api: ApiService) {}

  ngOnInit(): void {
    this.form = this.rootForm.control;
    this.tiposContacto = this.api.getTipos<TiposContacto>('contacto');
    this.tiposOrigen = this.api.getTipos<TiposOrigen>('origen');
  }

  get contactos() {
    return this.form.get('contactos') as FormArray;
  }

  agregarContacto() {
    this.contactos.push(
      this.fb.group({
        nombreCompleto: ['', Validators.required],
        origenInformacion: [parseInt(sessionStorage.getItem('origenInformacion')) | 1, Validators.required],
        tipoContacto: [1, Validators.required],
        telefono: '',
      })
    );
  }
  eliminarContacto(i: number) {
    this.contactos.removeAt(i);
  }
}
