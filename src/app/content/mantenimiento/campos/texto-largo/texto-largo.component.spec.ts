import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextoLargoComponent } from './texto-largo.component';

describe('TextoLargoComponent', () => {
  let component: TextoLargoComponent;
  let fixture: ComponentFixture<TextoLargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextoLargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextoLargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
