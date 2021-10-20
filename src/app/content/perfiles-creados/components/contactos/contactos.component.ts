import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiService } from '@app/@core';
import { TiposContacto, TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PUContactos } from '../../tablas-model';

@Component({
  selector: 'prx-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss'],
})
export class ContactosComponent implements OnInit {
  @Input() contactos: PUContactos[];
  @Input() tiposContacto: TiposContacto[];
  @Input() tiposOrigen: TiposOrigen[];
  @Output() actualizar = new EventEmitter();
  modalRef?: BsModalRef;
  btn = false;
  idEditar: string;
  constructor(private api: ApiService, private modalService: BsModalService) {}

  ngOnInit(): void {}
  eliminar(id: string) {
    this.btn = true;
    this.api
      .mantenimientosDelete('contactos', id)
      .pipe(finalize(() => (this.btn = false)))
      .subscribe((res: any) => {
        if (res.error) {
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Contacto Eliminado',
            text: res.contacto,
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
