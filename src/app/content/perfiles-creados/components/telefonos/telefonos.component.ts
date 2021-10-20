import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TiposOrigen, TiposTelefono } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}
  openModal(template: TemplateRef<any>, id?: string) {
    if (id) {
      this.idEditar = id;
    }
    this.modalRef = this.modalService.show(template);
  }
}
