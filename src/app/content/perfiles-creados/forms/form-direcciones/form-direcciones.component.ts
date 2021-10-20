import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { departamentosjson } from '@app/content/mantenimiento/inputs/direcciones/departamentos';
import { TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'prx-form-direcciones',
  templateUrl: './form-direcciones.component.html',
  styleUrls: ['./form-direcciones.component.scss'],
})
export class FormDireccionesComponent implements OnInit {
  departamentosYMunicipios = departamentosjson;
  @Input() titulo: string;
  @Input() modalRef: BsModalRef;
  @Input() tiposOrigen: TiposOrigen[];
  direccion: FormGroup;
  departamentos = Object.keys(this.departamentosYMunicipios);
  constructor(private fb: FormBuilder, private api: ApiService, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.direccion = this.fb.group({
      departamento: ['Guatemala', Validators.required],
      municipio: ['', Validators.required],
      zona: [1, Validators.required],
      colonia: [''],
      direccion: [''],
      referencia: [''],
      origenInformacion: ['', Validators.required],
    });
  }
  get departamento() {
    return this.direccion.get('departamento').value;
  }
  async submit() {
    const { id } = await this.rout.params.toPromise();
    if (this.titulo == 'Editar') {
      this.api.mantenimientos('put', 'direcciones', this.direccion.value, id);
    } else {
      this.api.mantenimientos('post', 'direcciones', this.direccion.value);
    }
  }
}
