import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { TiposDocumento } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'prx-form-documentos',
  templateUrl: './form-documentos.component.html',
  styleUrls: ['./form-documentos.component.scss'],
})
export class FormDocumentosComponent implements OnInit {
  @Input() titulo: string;
  @Input() modalRef: BsModalRef;
  @Input() tiposDeDocumento: TiposDocumento[];
  @Input() idEditar?: string;
  documento: FormGroup;
  constructor(private fb: FormBuilder, private api: ApiService, private rout: ActivatedRoute) {}

  ngOnInit(): void {
    this.documento = this.fb.group({ tipo: [Number, Validators.required], documento: ['', Validators.required] });
  }
  submit() {
    if (this.titulo == 'Editar') {
      this.api.mantenimientos('put', 'documentos', this.documento.value, this.idEditar).subscribe((re: any) => {
        if (re.error) {
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Documento actualizado',
            showConfirmButton: false,
            timer: 1500,
          });
          this.modalRef.hide();
        }
      });
    } else {
      this.rout.params.subscribe((re) => {
        console.log(this.documento.value);
        this.api
          .mantenimientos('post', 'documentos', { idPerfil: re.id, ...this.documento.value }, '')
          .subscribe((re: any) => {
            if (re.error) {
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Documento creado',
                showConfirmButton: false,
                timer: 1500,
              });
              this.modalRef.hide();
            }
          });
      });
    }
  }
}
