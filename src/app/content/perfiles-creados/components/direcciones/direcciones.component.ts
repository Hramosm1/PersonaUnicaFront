import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PUDirecciones } from '../../tablas-model';

@Component({
  selector: 'prx-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss'],
})
export class DireccionesComponent implements OnInit {
  @Input() direcciones: PUDirecciones[];
  @Input() tiposOrigen: TiposOrigen[];
  campos = ['departamento', 'municipio', 'zona', 'colonia', 'direccion', 'referencia'];
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
