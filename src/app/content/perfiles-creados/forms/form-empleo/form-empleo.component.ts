import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/@core';
import {
	Empresas,
	TiposOrigen,
} from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
	selector: 'prx-form-empleo',
	templateUrl: './form-empleo.component.html',
	styleUrls: ['./form-empleo.component.scss'],
})
export class FormEmpleoComponent implements OnInit {
	tiposOrigen: Observable<TiposOrigen[]>;
	@Input() titulo: string;
	@Input() modalRef: BsModalRef;
	@Input() idEditar?: string;
	modalRef2: BsModalRef;
	empleo: FormGroup;
	empresa: string = '';
	constructor(
		private fb: FormBuilder,
		private api: ApiService,
		private modalService: BsModalService,
		private rout: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.tiposOrigen = this.api.getTipos<TiposOrigen>('origen');
		this.empleo = this.fb.group({
			empresa: ['', Validators.required],
			puesto: [''],
			fechaInicio: [new Date(), Validators.required],
			fechaFin: [null],
			origenInformacion: [Number, Validators.required],
		});
	}

	openModal(template: TemplateRef<any>) {
		this.modalRef2 = this.modalService.show(template, {
			class: 'modal-xl modal-dialog-scrollable',
		});
	}

	asignar(value: Empresas) {
		this.empresa = value.razonSocial;
		this.empleo.get('empresa').setValue(value.id);
	}
	submit() {
		if (this.titulo == 'Editar') {
			console.log('este es el editar', this.idEditar);
			console.log('editando');
			this.api
				.mantenimientos('put', 'empleos', this.empleo.value, this.idEditar)
				.subscribe((re: any) => {
					if (re.error) {
					} else {
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: 'Empleo actualizado',
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
						'empleos',
						{ idPerfil: re.id, ...this.empleo.value },
						''
					)
					.subscribe((re: any) => {
						if (re.error) {
						} else {
							Swal.fire({
								position: 'top-end',
								icon: 'success',
								title: 'Empleo creado',
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
