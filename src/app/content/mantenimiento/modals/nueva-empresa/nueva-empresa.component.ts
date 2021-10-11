import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService, CredentialsService } from '@app/@core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Generos, TiposPersona } from '../../inputs/models';
import Swal from 'sweetalert2';

@Component({
  selector: 'prx-nueva-empresa',
  templateUrl: './nueva-empresa.component.html',
  styleUrls: ['./nueva-empresa.component.scss'],
})
export class NuevaEmpresaComponent implements OnInit {
  empresa: FormGroup;
  tipos: TiposPersona[];
  generos: Generos[];
  @Input() modalRef: BsModalRef;
  @Output() cerrarModal: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private credentials: CredentialsService, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getGeneros().subscribe((res) => (this.generos = res));
    this.api.getTiposPersona().subscribe((res) => (this.tipos = res));
    this.empresa = this.fb.group({
      idPerfil: '',
      primerApellido: [''],
      segundoApellido: [''],
      genero: [1],
      tipo: [2],
      razonSocial: [''],
      fecha: [''],
      observaciones: [''],
      nombreEjecutivo: [parseInt(this.credentials.credentials.idCobrador)],
      nombres: this.fb.array([this.fb.control('', Validators.required)]),
      correos: this.fb.array([]),
      empleos: this.fb.array([]),
      documentos: this.fb.array([]),
      telefonos: this.fb.array([]),
      direcciones: this.fb.array([]),
    });
  }
  get tipo() {
    return this.empresa.get('tipo').value;
  }
  submit() {
    this.api.PostRespuestaPersonaUnica(this.empresa.value).subscribe((res: any) => {
      if (res.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: res.mensaje,
        });
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos Ingresados',
          showConfirmButton: false,
          timer: 1500,
        });
        this.cerrarModal.emit();
      }
      this.modalRef.hide();
    });
  }
}
