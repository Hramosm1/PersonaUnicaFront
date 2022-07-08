import { Component, Input, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormGroup,
	FormGroupDirective,
	Validators,
} from '@angular/forms';
import { ApiService } from '@app/@core';
import { TiposOrigen } from '../models';
import { departamentosjson } from './departamentos';

@Component({
	selector: 'prx-direcciones',
	templateUrl: './direcciones.component.html',
	styleUrls: ['./direcciones.component.scss'],
})
export class DireccionesComponent implements OnInit {
	tiposOrigen: TiposOrigen[];
	departamentosYMunicipios = departamentosjson;
	form: FormGroup;

	departamentos = Object.keys(this.departamentosYMunicipios);
	constructor(
		private fb: FormBuilder,
		private rootForm: FormGroupDirective,
		private api: ApiService
	) {}

	ngOnInit(): void {
		this.form = this.rootForm.control;
		this.api
			.getTipos<TiposOrigen>('origen')
			.subscribe((tipos) => (this.tiposOrigen = tipos));
	}

	get direcciones() {
		return this.form.get('direcciones') as FormArray;
	}

	agregarDireccion() {
		this.direcciones.push(
			this.fb.group({
				departamento: ['Guatemala', Validators.required],
				municipio: ['', Validators.required],
				zona: [1, Validators.required],
				colonia: [''],
				direccion: [''],
				referencia: [''],
				origenInformacion: [1, Validators.required],
			})
		);
	}
	eliminarDireccion(i: number) {
		this.direcciones.removeAt(i);
	}
}
