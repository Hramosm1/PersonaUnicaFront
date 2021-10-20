import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiService } from '@app/@core';
import { TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PUDirecciones } from '../../tablas-model';

@Component({
  selector: 'prx-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss'],
})
export class DireccionesComponent implements OnInit {
  @Input() direcciones: PUDirecciones[];
  @Input() tiposOrigen: TiposOrigen[];
  @Output() actualizar = new EventEmitter();
  campos = ['departamento', 'municipio', 'zona', 'colonia', 'direccion', 'referencia'];
  modalRef?: BsModalRef;
  idEditar: string;
  btn = false;
  constructor(private api: ApiService, private modalService: BsModalService) {}

  ngOnInit(): void {}
  eliminar(id: string) {
    this.btn = true;
    this.api
      .mantenimientosDelete('direcciones', id)
      .pipe(finalize(() => (this.btn = false)))
      .subscribe((res: any) => {
        if (res.error) {
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Direccion Eliminado',
            text: res.direccion,
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
