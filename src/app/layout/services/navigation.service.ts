import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
	faLayerGroup,
	faHome,
	faPlus,
	faAddressCard,
	faListAlt,
} from '@fortawesome/free-solid-svg-icons';

import { NavigationOptions } from '../models/navigation';

@Injectable({
	providedIn: 'root',
})
export class NavigationService {
	constructor() {}

	getNavigationItems(): Observable<NavigationOptions[]> {
		return of([
			{
				title: 'Persona Unica',
				icon: { name: faLayerGroup },
				items: [
					{
						icon: { name: faAddressCard },
						title: 'Formulario Persona Unica',
						link: '/mantenimiento/personaunica',
					},
					{
						icon: { name: faListAlt },
						title: 'Listado de personas',
						link: '/perfiles/',
					},
				],
			},
		]);
	}
}
