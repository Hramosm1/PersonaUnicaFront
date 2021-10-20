import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { TiposContacto, TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'prx-form-contactos',
  templateUrl: './form-contactos.component.html',
  styleUrls: ['./form-contactos.component.scss'],
})
export class FormContactosComponent implements OnInit {
  @Input() tiposContacto: TiposContacto[];
  @Input() tiposOrigen: TiposOrigen[];
  @Input() titulo: string;
  @Input() modalRef: BsModalRef;
  contacto: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.contacto = this.fb.group({
      nombreCompleto: ['', Validators.required],
      origenInformacion: [Number, Validators.required],
      tipoContacto: [Number, Validators.required],
    });
  }
  async submit() {
    const { id } = await this.rout.params.toPromise();
    if (this.titulo == 'Editar') {
      this.api.mantenimientos('put', 'contactos', this.contacto.value, id);
    } else {
      this.api.mantenimientos('post', 'contactos', this.contacto.value);
    }
  }
}
