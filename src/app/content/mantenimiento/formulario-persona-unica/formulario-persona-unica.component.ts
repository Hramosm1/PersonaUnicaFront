import { Component, Input, OnInit } from '@angular/core';
import {
	FormArray,
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService, CredentialsService } from '@app/@core';
import { Generos, TiposPersona } from '../inputs/models';
import Swal from 'sweetalert2';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as _ from 'lodash';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'prx-formulario-persona-unica',
	templateUrl: './formulario-persona-unica.component.html',
	styleUrls: ['./formulario-persona-unica.component.scss'],
})
export class FormularioPersonaUnicaComponent implements OnInit {
	tipos: TiposPersona[];
	generos: Generos[];
	personaUnica: FormGroup;
	bsConfig: Partial<BsDatepickerConfig>;
	process: boolean = false;
	constructor(
		private title: Title,
		private fb: FormBuilder,
		private api: ApiService,
		private credentials: CredentialsService
	) {}

	ngOnInit(): void {
		this.title.setTitle('Persona Unica');
		this.creacionFormulario();
		this.api.getGeneros().subscribe((res) => (this.generos = res));
		this.api.getTiposPersona().subscribe((res) => (this.tipos = res));
	}
	private creacionFormulario(): void {
		this.personaUnica = this.fb.group({
			primerApellido: [''],
			segundoApellido: [''],
			genero: [1, Validators.required],
			tipo: [1, Validators.required],
			razonSocial: [''],
			fecha: [''],
			observaciones: [''],
			personaUnica: false,
			nombreEjecutivo: [parseInt(this.credentials.credentials.idCobrador)],
			nombres: this.fb.array([]),
			correos: this.fb.array([]),
			empleos: this.fb.array([]),
			documentos: this.fb.array([]),
			telefonos: this.fb.array([]),
			direcciones: this.fb.array([]),
			contactos: this.fb.array([]),
			referenciasWeb: this.fb.array([]),
		});
		this.validacionesFormulario();
		this.nombres.push(this.fb.control('', [Validators.required]));
	}

	get correos() {
		return this.personaUnica.get('correos') as FormArray;
	}
	get empleos() {
		return this.personaUnica.get('empleos') as FormArray;
	}
	get telefonos() {
		return this.personaUnica.get('telefonos') as FormArray;
	}
	get direcciones() {
		return this.personaUnica.get('direcciones') as FormArray;
	}
	get documentos() {
		return this.personaUnica.get('documentos') as FormArray;
	}
	get nombres() {
		return this.personaUnica.get('nombres') as FormArray;
	}
	get tipo() {
		return this.personaUnica.get('tipo').value;
	}
	private async limpiarFormArrays(): Promise<void> {
		await this.nombres.clear();
		await this.documentos.clear();
		await this.correos.clear();
		await this.direcciones.clear();
		await this.telefonos.clear();
		await this.empleos.clear();
	}
	private validacionesFormulario(): void {
		this.personaUnica.get('tipo').valueChanges.subscribe(async (valor) => {
			if (valor == 2) {
				await this.limpiarFormArrays();
				this.nombres.push(this.fb.control('', [Validators.required]));
				this.documentos.push(
					this.fb.group({
						tipo: ['', Validators.required],
						documento: ['', Validators.required],
					})
				);
			} else {
				await this.limpiarFormArrays();
				this.nombres.push(this.fb.control('', [Validators.required]));
			}
		});
	}
	submit() {
		this.process = true;
		if (this.documentos.length > 0) {
			(this.personaUnica.get('personaUnica') as FormControl).setValue(true);
		}
		this.api
			.PostRespuestaPersonaUnica(this.personaUnica.value)
			.pipe(
				finalize(() => {
					this.process = false;
				})
			)
			.subscribe((res: any) => {
				if (res.error) {
					console.log(this.personaUnica.value);
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
					this.personaUnica.reset({
						genero: 1,
						tipo: 1,
						nombreEjecutivo: parseInt(this.credentials.credentials.idCobrador),
						nombres: [''],
						razonSocial: '',
						observaciones: '',
						idPerfil: '',
					});
				}
			});
	}
}
