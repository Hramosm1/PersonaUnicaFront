import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNombresComponent } from './form-nombres.component';

describe('FormNombresComponent', () => {
	let component: FormNombresComponent;
	let fixture: ComponentFixture<FormNombresComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FormNombresComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FormNombresComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
