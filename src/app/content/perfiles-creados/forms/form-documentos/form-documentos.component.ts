import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { TiposDocumento } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'prx-form-documentos',
  templateUrl: './form-documentos.component.html',
  styleUrls: ['./form-documentos.component.scss'],
})
export class FormDocumentosComponent implements OnInit {
  @Input() titulo: string;
  @Input() modalRef: BsModalRef;
  @Input() tiposDeDocumento: TiposDocumento[];
  documento: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.documento = this.fb.group({ tipo: [Number, Validators.required], documento: ['', Validators.required] });
  }
  async submit() {
    const { id } = await this.rout.params.toPromise();
    console.log('entro', id);
    if (this.titulo == 'Editar') {
      this.api.mantenimientos('put', 'documentos', this.documento.value, id);
    } else {
      this.api.mantenimientos('post', 'contactos', this.documento.value);
    }
  }
}
