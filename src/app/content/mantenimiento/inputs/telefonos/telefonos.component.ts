import { Component, OnInit } from '@angular/core';
import { CodigosTelefono } from './telCodigos';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'prx-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.scss'],
})
export class TelefonosComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private rootForm: FormGroupDirective) {}
  telExt = CodigosTelefono;
  ngOnInit(): void {
    this.form = this.rootForm.control;
  }
  get telefonos() {
    return this.form.get('telefonos') as FormArray;
  }
  agregarTelefono() {
    this.telefonos.push(
      this.fb.group({
        codigoPais: ['+ 502', Validators.required],
        telefono: ['', Validators.required],
      })
    );
  }

  quitarTelefono(i: number) {
    this.telefonos.removeAt(i);
  }
}
