import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'prx-texto-largo',
  templateUrl: './texto-largo.component.html',
  styleUrls: ['./texto-largo.component.scss'],
})
export class TextoLargoComponent implements OnInit {
  @Input() titulo: string;
  @Output() tituloChange = new EventEmitter<string>();
  constructor() {}
  ngOnInit(): void {}
}
