import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { departamentosjson } from './departamentos';

@Component({
  selector: 'prx-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss'],
})
export class DireccionesComponent implements OnInit {
  departamentosYMunicipios = departamentosjson;
  form: FormGroup;
  departamentos = Object.keys(this.departamentosYMunicipios);
  constructor(private fb: FormBuilder, private rootForm: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootForm.control;
  }

  get direcciones() {
    return this.form.get('direcciones') as FormArray;
  }

  agregarDireccion() {
    this.direcciones.push(
      this.fb.group({
        departamento: ['Guatemala', Validators.required],
        municipio: ['', Validators.required],
        zona: [1, Validators.required],
        colonia: [''],
        direccion: [''],
        referencia: [''],
      })
    );
  }
  eliminarDireccion(i: number) {
    this.direcciones.removeAt(i);
  }
}
