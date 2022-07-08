import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'prx-texto-corto',
	templateUrl: './texto-corto.component.html',
	styleUrls: ['./texto-corto.component.scss'],
})
export class TextoCortoComponent implements OnInit {
	@Input() titulo: string;
	@Output() tituloChange = new EventEmitter<string>();
	constructor() {}

	ngOnInit(): void {}
}
