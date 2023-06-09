import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import {
	TiposOrigen,
	TiposTelefono,
} from '@app/content/mantenimiento/inputs/models';
import { CodigosTelefono } from '@app/content/mantenimiento/inputs/telefonos/telCodigos';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: 'prx-form-telefonos',
	templateUrl: './form-telefonos.component.html',
	styleUrls: ['./form-telefonos.component.scss'],
})
export class FormTelefonosComponent implements OnInit {
	@Input() titulo: string;
	@Input() modalRef: BsModalRef;
	@Input() idEditar?: string;
	tiposTelefono: Observable<TiposTelefono[]>;
	tiposOrigen: Observable<TiposOrigen[]>;
	telExt = CodigosTelefono;
	telefono: FormGroup;
	id: string;
	constructor(
		private fb: FormBuilder,
		private api: ApiService,
		private rout: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.tiposOrigen = this.api.getTipos('origen');
		this.tiposTelefono = this.api.getTipos('telefono');
		this.telefono = this.fb.group({
			codigoPais: ['+ 502', Validators.required],
			telefono: ['', Validators.required],
			tipoTelefono: [1, Validators.required],
			origenInformacion: [1, Validators.required],
		});
	}
	submit() {
		if (this.titulo == 'Editar') {
			console.log('este es el editar', this.idEditar);
			console.log('editando');
			this.api
				.mantenimientos('put', 'telefonos', this.telefono.value, this.idEditar)
				.subscribe((re: any) => {
					if (re.error) {
					} else {
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: 'Teléfono actualizado',
							showConfirmButton: false,
							timer: 1500,
						});
						this.modalRef.hide();
					}
				});
		} else {
			this.rout.params.subscribe((re) => {
				console.log('creando');
				this.api
					.mantenimientos(
						'post',
						'telefonos',
						{ idPerfil: re.id, ...this.telefono.value },
						''
					)
					.subscribe((re: any) => {
						if (re.error) {
						} else {
							Swal.fire({
								position: 'top-end',
								icon: 'success',
								title: 'Teléfono creado',
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
