import { Component, OnInit } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'prx-fecha',
	templateUrl: './fecha.component.html',
	styleUrls: ['./fecha.component.scss'],
})
export class FechaComponent implements OnInit {
	icon = faCalendar;
	constructor() {}

	ngOnInit(): void {}
}
