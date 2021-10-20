import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ApiService } from '@app/@core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Empresas } from '../../inputs/models';

@Component({
  selector: 'prx-lista-empleos',
  templateUrl: './lista-empleos.component.html',
  styleUrls: ['./lista-empleos.component.scss'],
})
export class ListaEmpleosComponent implements OnInit {
  empleos: Empresas[];
  filtro: string = '';
  ColumnMode = ColumnMode;
  @Input() modalRef: BsModalRef;
  @Output() seleccionado: EventEmitter<Empresas> = new EventEmitter();
  chillModalRef: BsModalRef;
  constructor(private api: ApiService, private bsmodalService: BsModalService) {}

  ngOnInit(): void {
    this.actualizarCampos();
  }
  actualizarCampos(e?: any): void {
    this.api.getEmpresas().subscribe((res) => {
      this.empleos = res;
      console.log(this.empleos);
    });
  }
  openModal(template: TemplateRef<any>) {
    this.chillModalRef = this.bsmodalService.show(template, { class: 'modal-xl' });
  }
  enviarInfo(row: Empresas) {
    this.seleccionado.emit(row);
    this.modalRef.hide();
  }
}
