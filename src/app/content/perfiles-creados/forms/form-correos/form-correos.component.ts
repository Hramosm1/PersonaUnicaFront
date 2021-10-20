import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'prx-form-correos',
  templateUrl: './form-correos.component.html',
  styleUrls: ['./form-correos.component.scss'],
})
export class FormCorreosComponent implements OnInit {
  @Input() titulo: string;
  @Input() modalRef: BsModalRef;
  @Input() tiposOrigen: TiposOrigen[];
  correo: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.correo = this.fb.group({
      correo: ['', Validators.required],
      origenInformacion: [Number, Validators.required],
    });
  }
  async submit() {
    const { id } = await this.rout.params.toPromise();
    if (this.titulo == 'Editar') {
      this.api.mantenimientos('put', 'correos', this.correo.value, id);
    } else {
      this.api.mantenimientos('post', 'correos', this.correo.value);
    }
  }
}
