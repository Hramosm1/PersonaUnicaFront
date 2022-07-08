import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciasWebComponent } from './referencias-web.component';

describe('ReferenciasWebComponent', () => {
	let component: ReferenciasWebComponent;
	let fixture: ComponentFixture<ReferenciasWebComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ReferenciasWebComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ReferenciasWebComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
