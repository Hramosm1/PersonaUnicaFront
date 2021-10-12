import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService, CredentialsService } from '@app/@core';
import { Generos, TiposPersona } from '../inputs/models';
import Swal from 'sweetalert2';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import * as _ from 'lodash';

@Component({
  selector: 'prx-formulario-persona-unica',
  templateUrl: './formulario-persona-unica.component.html',
  styleUrls: ['./formulario-persona-unica.component.scss'],
})
export class FormularioPersonaUnicaComponent implements OnInit {
  @Input() perfil?: any;
  tipos: TiposPersona[];
  generos: Generos[];
  personaUnica: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
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
      idPerfil: '',
      primerApellido: [''],
      segundoApellido: [''],
      genero: [1, Validators.required],
      tipo: [1, Validators.required],
      razonSocial: [''],
      fecha: [''],
      observaciones: [''],
      personaUnica: 0,
      nombreEjecutivo: [parseInt(this.credentials.credentials.idCobrador)],
      nombres: this.fb.array([]),
      correos: this.fb.array([]),
      empleos: this.fb.array([]),
      documentos: this.fb.array([]),
      telefonos: this.fb.array([]),
      direcciones: this.fb.array([]),
    });
    this.validacionesFormulario();
    if (this.perfil) {
      this.setValues();
    } else {
      this.nombres.push(this.fb.control('', [Validators.required]));
    }
  }
  setValues() {
    const base = _.omit(this.perfil, ['nombres', 'correos', 'empleos', 'documentos', 'telefonos', 'direcciones']);
    this.personaUnica.patchValue(base);
    this.setNombres(this.perfil.nombres);
    this.setCorreos(this.perfil.correos);
    console.log(this.personaUnica.value);
  }
  setNombres(arr: Array<any>) {
    arr.forEach((element, i) => {
      this.nombres.push(this.fb.control(element));
    });
  }
  setCorreos(arr: Array<any>) {
    arr.forEach((element) => {
      this.correos.push(this.fb.control(element, [Validators.required, Validators.email]));
    });
  }
  setDirecciones(arr: Array<any>) {
    arr.forEach((element) => {});
  }
  settelefonos(arr: Array<any>) {
    arr.forEach((element) => {});
  }
  setEmpleos(arr: Array<any>) {
    arr.forEach((element) => {});
  }
  setDocumentos(arr: Array<any>) {
    arr.forEach((element) => {});
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
        this.documentos.push(this.fb.group({ tipo: ['', Validators.required], documento: ['', Validators.required] }));
      } else {
        await this.limpiarFormArrays();
        this.nombres.push(this.fb.control('', [Validators.required]));
      }
      console.log('termino');
    });
  }
  submit() {
    if (this.documentos.length > 0) {
      (this.personaUnica.get('personaUnica') as FormControl).setValue(1);
    }
    this.api.PostRespuestaPersonaUnica(this.personaUnica.value).subscribe((res: any) => {
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
        this.personaUnica.reset({
          genero: 1,
          tipo: 1,
          nombreEjecutivo: parseInt(this.credentials.credentials.idCobrador),
          nombres: [''],
        });
      }
    });
  }
}
