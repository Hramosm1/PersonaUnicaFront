import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiService } from '@app/@core';
import { TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PUReferenciasWeb } from '../../tablas-model';

@Component({
  selector: 'prx-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.scss'],
})
export class RedesComponent implements OnInit {
  @Input() referenciasWeb: PUReferenciasWeb[];
  @Output() actualizar = new EventEmitter();
  modalRef?: BsModalRef;
  idEditar: string;
  btn = false;
  constructor(private api: ApiService, private modalService: BsModalService) {}

  ngOnInit(): void {}
  eliminar(id: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Esta seguro que desea eliminar',
        text: 'Esta accion es irreversible',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Eliminalo',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.btn = true;
          this.api
            .mantenimientosDelete('referenciasWeb', id)
            .pipe(finalize(() => (this.btn = false)))
            .subscribe((res: any) => {
              if (res.error) {
              } else {
                swalWithBootstrapButtons.fire('Eliminado', 'Referencia Eliminado.', 'error');
                this.actualizar.emit();
              }
            });
        }
      });
  }
  openModal(template: TemplateRef<any>, id?: string) {
    if (id) {
      this.idEditar = id;
    }
    this.modalRef = this.modalService.show(template);
    this.modalService.onHide.subscribe(() => this.actualizar.emit());
  }
}
