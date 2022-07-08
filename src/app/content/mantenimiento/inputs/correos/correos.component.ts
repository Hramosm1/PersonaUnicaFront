import { Component, OnInit, TemplateRef } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	FormGroupDirective,
	Validators,
} from '@angular/forms';
import { ApiService } from '@app/@core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TiposOrigen } from '../models';

@Component({
	selector: 'prx-correos',
	templateUrl: './correos.component.html',
	styleUrls: ['./correos.component.scss'],
})
export class CorreosComponent implements OnInit {
	form: FormGroup;
	modalRef: BsModalRef;
	tiposOrigen: TiposOrigen[];
	constructor(
		private fb: FormBuilder,
		private rootForm: FormGroupDirective,
		private modalService: BsModalService,
		private api: ApiService
	) {}

	ngOnInit(): void {
		this.form = this.rootForm.control;
		this.api
			.getTipos<TiposOrigen>('origen')
			.subscribe((or) => (this.tiposOrigen = or));
	}

	get correos() {
		return this.form.get('correos') as FormArray;
	}
	agregarCorreo() {
		this.correos.push(
			this.fb.group({
				correo: ['', [Validators.required, Validators.email]],
				origenInformacion: [1, Validators.required],
			})
		);
	}
	eliminarCorreo(i: number) {
		this.correos.removeAt(i);
	}
	openModal() {
		//this.modalRef = this.modalService.show(template,{class:''})
	}
	closeModal() {
		this.modalRef.hide;
	}
}
