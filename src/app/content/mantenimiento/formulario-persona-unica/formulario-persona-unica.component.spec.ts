import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPersonaUnicaComponent } from './formulario-persona-unica.component';

describe('FormularioPersonaUnicaComponent', () => {
	let component: FormularioPersonaUnicaComponent;
	let fixture: ComponentFixture<FormularioPersonaUnicaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FormularioPersonaUnicaComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FormularioPersonaUnicaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
