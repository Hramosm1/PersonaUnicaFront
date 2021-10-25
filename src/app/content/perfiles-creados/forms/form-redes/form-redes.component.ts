import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { TiposOrigen, TiposPaginaWeb } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'prx-form-redes',
  templateUrl: './form-redes.component.html',
  styleUrls: ['./form-redes.component.scss'],
})
export class FormRedesComponent implements OnInit {
  @Input() titulo: string;
  @Input() modalRef: BsModalRef;
  @Input() idEditar?: string;
  tiposOrigen: Observable<TiposOrigen[]>;
  paginas: TiposPaginaWeb[];
  referencia: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.tiposOrigen = this.api.getTipos('origen');
    this.api.getTipos<TiposPaginaWeb>('pagina').subscribe((res) => (this.paginas = res));
    this.referencia = this.fb.group({
      tipo: [1, Validators.required],
      origenInformacion: [1, Validators.required],
      link: ['', Validators.required],
    });
  }
  submit() {
    if (this.titulo == 'Editar') {
      console.log('este es el editar', this.idEditar);
      console.log('editando');
      this.api.mantenimientos('put', 'referenciasWeb', this.referencia.value, this.idEditar).subscribe((re: any) => {
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
          .mantenimientos('post', 'referenciasWeb', { idPerfil: re.id, ...this.referencia.value }, '')
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
