import { Component, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	FormGroupDirective,
	Validators,
} from '@angular/forms';
import { ApiService } from '@app/@core';
import { Observable } from 'rxjs';
import { TiposOrigen, TiposPaginaWeb } from '../models';

@Component({
	selector: 'prx-referencias-web',
	templateUrl: './referencias-web.component.html',
	styleUrls: ['./referencias-web.component.scss'],
})
export class ReferenciasWebComponent implements OnInit {
	form: FormGroup;
	tiposOrigen: Observable<Array<TiposOrigen>>;
	referencias: Observable<Array<TiposPaginaWeb>>;
	constructor(
		private fb: FormBuilder,
		private rootForm: FormGroupDirective,
		private api: ApiService
	) {}

	ngOnInit(): void {
		this.form = this.rootForm.control;
		this.referencias = this.api.getTipos<TiposPaginaWeb>('pagina');
		this.tiposOrigen = this.api.getTipos<TiposOrigen>('origen');
	}
	get paginas() {
		return this.form.get('referenciasWeb') as FormArray;
	}

	agregarReferencia() {
		this.paginas.push(
			this.fb.group({
				tipo: [1, Validators.required],
				origenInformacion: [1, Validators.required],
				link: ['', Validators.required],
			})
		);
	}
	eliminarReferencia(i: number) {
		this.paginas.removeAt(i);
	}
}
