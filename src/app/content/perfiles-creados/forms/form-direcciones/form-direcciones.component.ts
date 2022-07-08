import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import { departamentosjson } from '@app/content/mantenimiento/inputs/direcciones/departamentos';
import { TiposOrigen } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: 'prx-form-direcciones',
	templateUrl: './form-direcciones.component.html',
	styleUrls: ['./form-direcciones.component.scss'],
})
export class FormDireccionesComponent implements OnInit {
	departamentosYMunicipios = departamentosjson;
	@Input() titulo: string;
	@Input() modalRef: BsModalRef;
	tiposOrigen: Observable<TiposOrigen[]>;
	@Input() idEditar?: string;
	direccion: FormGroup;
	departamentos = Object.keys(this.departamentosYMunicipios);
	constructor(
		private fb: FormBuilder,
		private api: ApiService,
		private rout: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.tiposOrigen = this.api.getTipos('origen');
		this.direccion = this.fb.group({
			departamento: ['Guatemala', Validators.required],
			municipio: ['', Validators.required],
			zona: [1, Validators.required],
			colonia: [''],
			direccion: [''],
			referencia: [''],
			origenInformacion: ['', Validators.required],
		});
	}
	get departamento() {
		return this.direccion.get('departamento').value;
	}
	submit() {
		if (this.titulo == 'Editar') {
			console.log('este es el editar', this.idEditar);
			console.log('editando');
			this.api
				.mantenimientos(
					'put',
					'direcciones',
					this.direccion.value,
					this.idEditar
				)
				.subscribe((re: any) => {
					if (re.error) {
					} else {
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: 'Dirección actualizado',
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
						'direcciones',
						{ idPerfil: re.id, ...this.direccion.value },
						''
					)
					.subscribe((re: any) => {
						if (re.error) {
						} else {
							Swal.fire({
								position: 'top-end',
								icon: 'success',
								title: 'Dirección creado',
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
