import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiService } from '@app/@core';
import { TiposOrigen, TiposTelefono } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PUTelefonos } from '../../tablas-model';

@Component({
  selector: 'prx-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.scss'],
})
export class TelefonosComponent implements OnInit {
  @Input() telefonos: PUTelefonos[];
  @Input() tiposTelefono: TiposTelefono[];
  @Input() tiposOrigen: TiposOrigen[];
  idEditar: string;
  modalRef?: BsModalRef;
  btn = false;
  tip = ['celular', 'casa', 'pbx'];
  @Output() actualizar = new EventEmitter();
  constructor(private modalService: BsModalService, private api: ApiService) {}

  ngOnInit(): void {}
  eliminar(id: string) {
    this.btn = true;
    this.api
      .mantenimientosDelete('telefonos', id)
      .pipe(finalize(() => (this.btn = false)))
      .subscribe((res: any) => {
        if (res.error) {
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Telefono Eliminado',
            text: res.telefono,
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
