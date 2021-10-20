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
  @Input() tiposDeDocumento: TiposDocumento[];
  tipos: any;
  modalRef?: BsModalRef;
  idEditar: string;
  btn = false;
  @Output() actualizar = new EventEmitter();
  constructor(private api: ApiService, private modalService: BsModalService) {}

  ngOnInit(): void {}
  eliminar(id: string) {
    this.btn = true;
    this.api
      .mantenimientosDelete('documentos', id)
      .pipe(finalize(() => (this.btn = false)))
      .subscribe((res: any) => {
        if (res.error) {
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Documento Eliminado',
            text: res.documento,
          });
          this.actualizar.emit();
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
