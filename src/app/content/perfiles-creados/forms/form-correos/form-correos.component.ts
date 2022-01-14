import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'prx-form-correos',
  templateUrl: './form-correos.component.html',
  styleUrls: ['./form-correos.component.scss'],
})
export class FormCorreosComponent implements OnInit {
  @Input() titulo: string;
  @Input() modalRef: BsModalRef;
  tiposOrigen: Observable<TiposOrigen[]>;
  @Input() idEditar?: string;
  correo: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.tiposOrigen = this.api.getTipos('origen');
    this.correo = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      origenInformacion: [1, Validators.required],
    });
  }
  submit() {
    if (this.titulo == 'Editar') {
      console.log('este es el editar', this.idEditar);
      console.log('editando');
      this.api.mantenimientos('put', 'correos', this.correo.value, this.idEditar).subscribe((re: any) => {
        if (re.error) {
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Correo actualizado',
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
          .mantenimientos('post', 'correos', { idPerfil: re.id, ...this.correo.value }, '')
          .subscribe((re: any) => {
            if (re.error) {
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Correo creado',
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
