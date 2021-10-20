import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@app/@core';
import { TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'prx-form-empleo',
  templateUrl: './form-empleo.component.html',
  styleUrls: ['./form-empleo.component.scss'],
})
export class FormEmpleoComponent implements OnInit {
  tiposOrigen: Observable<TiposOrigen[]>;
  @Input() titulo: string;
  @Input() modalRef: BsModalRef;
  @Input() idEditar?: string;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.tiposOrigen = this.api.getTipos<TiposOrigen>('origen');
  }
  // submit() {
  //   if (this.titulo == 'Editar') {
  //     console.log('este es el editar', this.idEditar);
  //     console.log('editando');
  //     this.api.mantenimientos('put', 'telefonos', this.telefono.value, this.idEditar).subscribe((re: any) => {
  //       if (re.error) {
  //       } else {
  //         Swal.fire({
  //           position: 'top-end',
  //           icon: 'success',
  //           title: 'Telefono actualizado',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         this.modalRef.hide();
  //       }
  //     });
  //   } else {
  //     this.rout.params.subscribe((re) => {
  //       console.log('creando');
  //       this.api
  //         .mantenimientos('post', 'telefonos', { idPerfil: re.id, ...this..value }, '')
  //         .subscribe((re: any) => {
  //           if (re.error) {
  //           } else {
  //             Swal.fire({
  //               position: 'top-end',
  //               icon: 'success',
  //               title: 'telefono creado',
  //               showConfirmButton: false,
  //               timer: 1500,
  //             });
  //             this.modalRef.hide();
  //           }
  //         });
  //     });
  //   }
  // }
}
