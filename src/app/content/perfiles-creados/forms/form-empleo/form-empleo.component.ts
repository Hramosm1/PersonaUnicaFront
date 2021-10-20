import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '@app/@core';
import { TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'prx-form-empleo',
  templateUrl: './form-empleo.component.html',
  styleUrls: ['./form-empleo.component.scss'],
})
export class FormEmpleoComponent implements OnInit {
  tiposOrigen: Observable<TiposOrigen[]>;
  @Input() titulo: string;
  @Input() modalRef: BsModalRef;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.tiposOrigen = this.api.getTipos<TiposOrigen>('origen');
  }
  async submit() {}
}
