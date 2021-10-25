import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiService } from '@app/@core';
import { TiposDocumento } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PUDocumentos } from '../../tablas-model';

@Component({
  selector: 'prx-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.scss'],
})
export class DocumentosComponent implements OnInit {
  @Input() documentos: PUDocumentos[];
  tipos: TiposDocumento[];
  modalRef?: BsModalRef;
  idEditar: string;
  btn = false;
  @Output() actualizar = new EventEmitter();
  constructor(private api: ApiService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.api.getTipos<TiposDocumento>('documento').subscribe((res) => (this.tipos = res));
  }
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
            .mantenimientosDelete('documentos', id)
            .pipe(finalize(() => (this.btn = false)))
            .subscribe((res: any) => {
              if (res.error) {
              } else {
                swalWithBootstrapButtons.fire('Eliminado', 'Documento Eliminado.', 'error');
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
