import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCorreosComponent } from './form-correos.component';

describe('FormCorreosComponent', () => {
	let component: FormCorreosComponent;
	let fixture: ComponentFixture<FormCorreosComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FormCorreosComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FormCorreosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
