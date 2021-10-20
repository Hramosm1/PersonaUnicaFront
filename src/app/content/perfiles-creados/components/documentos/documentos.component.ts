import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TiposDocumento } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
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
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
