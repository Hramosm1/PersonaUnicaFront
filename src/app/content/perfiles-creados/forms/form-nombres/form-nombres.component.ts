import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'prx-form-nombres',
  templateUrl: './form-nombres.component.html',
  styleUrls: ['./form-nombres.component.scss'],
})
export class FormNombresComponent implements OnInit {
  @Input() titulo: string;
  @Input() modalRef: BsModalRef;
  @Input() idEditar?: string;
  nombre: FormControl;
  constructor(private fb: FormBuilder, private api: ApiService, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.nombre = this.fb.control('', Validators.required);
  }
  submit() {
    if (this.titulo == 'Editar') {
      this.api.mantenimientos('put', 'nombres', this.nombre.value, this.idEditar).subscribe((re: any) => {
        if (re.error) {
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Nombre actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.modalRef.hide();
        }
      });
    } else {
      this.rout.params.subscribe((re) => {
        console.log(this.nombre.value);
        this.api
          .mantenimientos('post', 'nombres', { idPerfil: re.id, nombre: this.nombre.value }, '')
          .subscribe((re: any) => {
            if (re.error) {
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Nombre creado',
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
