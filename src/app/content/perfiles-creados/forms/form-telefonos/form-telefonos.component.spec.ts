import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTelefonosComponent } from './form-telefonos.component';

describe('FormTelefonosComponent', () => {
  let component: FormTelefonosComponent;
  let fixture: ComponentFixture<FormTelefonosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormTelefonosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTelefonosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
