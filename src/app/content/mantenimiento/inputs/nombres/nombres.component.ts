import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'prx-nombres',
  templateUrl: './nombres.component.html',
  styleUrls: ['./nombres.component.scss'],
})
export class NombresComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private rootForm: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootForm.control;
  }
  get nombres() {
    return this.form.get('nombres') as FormArray;
  }
  agregarNombre() {
    this.nombres.push(this.fb.control('', Validators.required));
  }
  eliminarNombre(i: number) {
    this.nombres.removeAt(i);
  }
}
