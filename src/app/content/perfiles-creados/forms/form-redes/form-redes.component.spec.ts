import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRedesComponent } from './form-redes.component';

describe('FormRedesComponent', () => {
  let component: FormRedesComponent;
  let fixture: ComponentFixture<FormRedesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormRedesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
