import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ApiService } from '@app/@core';
import { TiposDocumento } from '../models';

@Component({
  selector: 'prx-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
})
export class DocumentosComponent implements OnInit {
  form: FormGroup;
  tiposDeDocumento: TiposDocumento[];

  constructor(private api: ApiService, private fb: FormBuilder, private rootForm: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootForm.control;
    this.api.getTipos<TiposDocumento>('documento').subscribe((res) => (this.tiposDeDocumento = res));
  }

  public get documentos(): FormArray {
    return this.form.get('documentos') as FormArray;
  }

  nuevoDocumento() {
    this.documentos.push(this.fb.group({ tipo: [Number, Validators.required], documento: ['', Validators.required] }));
  }
  eliminarDocumento(i: number) {
    this.documentos.removeAt(i);
  }
}
