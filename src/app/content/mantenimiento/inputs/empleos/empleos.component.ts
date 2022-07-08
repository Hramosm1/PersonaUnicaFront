import { Component, OnInit, TemplateRef } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	FormGroupDirective,
	Validators,
} from '@angular/forms';
import { ApiService } from '@app/@core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Empresas, TiposOrigen } from '../models';

@Component({
	selector: 'prx-empleos',
	templateUrl: './empleos.component.html',
	styleUrls: ['./empleos.component.scss'],
})
export class EmpleosComponent implements OnInit {
	form: FormGroup;
	empresas: Array<Empresas>;
	modalRef: BsModalRef;
	indexTem: number;
	tiposOrigen: Observable<TiposOrigen[]>;
	nombres: string[] = [];
	constructor(
		private fb: FormBuilder,
		private rootForm: FormGroupDirective,
		private apis: ApiService,
		private modalService: BsModalService
	) {}

	ngOnInit(): void {
		this.form = this.rootForm.control;
		this.apis.getEmpresas().subscribe((res) => (this.empresas = res));
		this.tiposOrigen = this.apis.getTipos<TiposOrigen>('origen');
	}

	openModal(template: TemplateRef<any>, i: number) {
		this.indexTem = i;
		this.modalRef = this.modalService.show(template, {
			class: 'modal-xl modal-dialog-scrollable',
		});
	}
	get empleos() {
		return this.form.get('empleos') as FormArray;
	}

	agregarEmpleo() {
		this.empleos.push(
			this.fb.group({
				empresa: ['', Validators.required],
				puesto: [''],
				fechaInicio: [null],
				fechaFin: [null],
				origenInformacion: [1, Validators.required],
			})
		);
		this.nombres.push('');
	}

	eliminarEmpleo(i: number) {
		this.empleos.removeAt(i);
		this.nombres.splice(i, 1);
	}
	asignar(value: Empresas) {
		this.nombres[this.indexTem] = value.nombre;
		(this.empleos.at(this.indexTem) as FormControl)
			.get('empresa')
			.setValue(value.id);
	}
}
