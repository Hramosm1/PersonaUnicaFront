import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TiposContacto, TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
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
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
