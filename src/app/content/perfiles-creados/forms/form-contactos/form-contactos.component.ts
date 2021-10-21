import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { TiposContacto, TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

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
  @Input() idEditar?: string;
  contacto: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.contacto = this.fb.group({
      nombreCompleto: ['', Validators.required],
      origenInformacion: [Number, Validators.required],
      tipoContacto: [Number, Validators.required],
    });
  }
  submit() {
    if (this.titulo == 'Editar') {
      console.log('este es el editar', this.idEditar);
      console.log('editando');
      this.api.mantenimientos('put', 'contactos', this.contacto.value, this.idEditar).subscribe((re: any) => {
        if (re.error) {
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contacto actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.modalRef.hide();
        }
      });
    } else {
      this.rout.params.subscribe((re) => {
        console.log('creando');
        this.api
          .mantenimientos('post', 'contactos', { idPerfil: re.id, ...this.contacto.value }, '')
          .subscribe((re: any) => {
            if (re.error) {
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Contacto creado',
                showConfirmButton: false,
                timer: 1500,
              });
              this.modalRef.hide();
            }
          });
      });
    }
  }
}