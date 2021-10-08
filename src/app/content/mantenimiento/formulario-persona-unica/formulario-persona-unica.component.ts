import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService, CredentialsService } from '@app/@core';
import { Generos, TiposPersona } from '../inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'prx-formulario-persona-unica',
  templateUrl: './formulario-persona-unica.component.html',
  styleUrls: ['./formulario-persona-unica.component.scss'],
})
export class FormularioPersonaUnicaComponent implements OnInit {
  tipos: TiposPersona[];
  generos: Generos[];
  personaUnica: FormGroup;
  modalRef: BsModalRef;
  constructor(
    private title: Title,
    private fb: FormBuilder,
    private api: ApiService,
    private credentials: CredentialsService,
    private modalServide: BsModalService
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
      nombreEjecutivo: [parseInt(this.credentials.credentials.idCobrador)],
      nombres: this.fb.array([this.fb.control('', [Validators.required])]),
      correos: this.fb.array([]),
      empleos: this.fb.array([]),
      documentos: this.fb.array([]),
      telefonos: this.fb.array([]),
      direcciones: this.fb.array([]),
    });
    this.validacionesFormulario();
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
    this.api.PostRespuestaPersonaUnica(this.personaUnica.value).subscribe((res: any) => {
      this.personaUnica.reset();
    });
  }
}
