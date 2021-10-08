import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'prx-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.scss'],
})
export class CorreosComponent implements OnInit {
  form: FormGroup;
  modalRef: BsModalRef;
  constructor(private fb: FormBuilder, private rootForm: FormGroupDirective, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.form = this.rootForm.control;
  }

  get correos() {
    return this.form.get('correos') as FormArray;
  }
  agregarCorreo() {
    this.correos.push(this.fb.control('', [Validators.required, Validators.email]));
  }
  eliminarCorreo(i: number) {
    this.correos.removeAt(i);
  }
  openModal() {
    //this.modalRef = this.modalService.show(template,{class:''})
  }
  closeModal() {
    this.modalRef.hide;
  }
}
