import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ApiService } from '@app/@core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Empresas } from '../models';

@Component({
  selector: 'prx-empleos',
  templateUrl: './empleos.component.html',
  styleUrls: ['./empleos.component.scss'],
})
export class EmpleosComponent implements OnInit {
  form: FormGroup;
  empresas: Array<Empresas>;
  modalRef: BsModalRef;
  constructor(
    private fb: FormBuilder,
    private rootForm: FormGroupDirective,
    private apis: ApiService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.form = this.rootForm.control;
    this.apis.getEmpresas().subscribe((res) => (this.empresas = res));
    console.log(this.empleos.controls);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-xl' });
  }
  get empleos() {
    return this.form.get('empleos') as FormArray;
  }

  agregarEmpleo() {
    this.empleos.push(
      this.fb.group({
        empresa: [Number, Validators.required],
        puesto: ['', Validators.required],
        fechaInicio: [new Date(), Validators.required],
        fechaFin: [''],
      })
    );
  }
  eliminarEmpleo(i: number) {
    this.empleos.removeAt(i);
  }
}
