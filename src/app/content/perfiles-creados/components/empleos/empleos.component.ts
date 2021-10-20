import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiService } from '@app/@core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PUEmpleos } from '../../tablas-model';

@Component({
  selector: 'prx-empleos',
  templateUrl: './empleos.component.html',
  styleUrls: ['./empleos.component.scss'],
})
export class EmpleosComponent implements OnInit {
  @Input() empleos: PUEmpleos[];
  modalRef?: BsModalRef;
  idEditar: string;
  btn = false;
  @Output() actualizar = new EventEmitter();
  constructor(private api: ApiService, private modalService: BsModalService) {}

  ngOnInit(): void {
    console.log(this.empleos);
  }
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
            text: res.Documento,
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
