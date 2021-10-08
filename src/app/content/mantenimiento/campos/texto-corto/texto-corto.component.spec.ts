import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoCortoComponent } from './texto-corto.component';

describe('TextoCortoComponent', () => {
  let component: TextoCortoComponent;
  let fixture: ComponentFixture<TextoCortoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextoCortoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoCortoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
