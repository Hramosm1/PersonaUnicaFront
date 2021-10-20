import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { PUCorreos } from '../../tablas-model';

@Component({
  selector: 'prx-correos',
  templateUrl: './correos.component.html',
  styleUrls: ['./correos.component.scss'],
})
export class CorreosComponent implements OnInit {
  @Input() correos: PUCorreos[];
  @Input() tiposOrigen: TiposOrigen[];
  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
