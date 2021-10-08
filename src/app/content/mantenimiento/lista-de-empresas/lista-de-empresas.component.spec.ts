import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeEmpresasComponent } from './lista-de-empresas.component';

describe('ListaDeEmpresasComponent', () => {
  let component: ListaDeEmpresasComponent;
  let fixture: ComponentFixture<ListaDeEmpresasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeEmpresasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
