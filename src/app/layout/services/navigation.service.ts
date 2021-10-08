import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { faLayerGroup, faHome, faPlus, faAddressCard } from '@fortawesome/free-solid-svg-icons';

import { NavigationOptions } from '../models/navigation';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  getNavigationItems(): Observable<NavigationOptions[]> {
    return of([
      {
        title: 'mantenimiento',
        icon: { name: faLayerGroup },
        items: [
          {
            icon: { name: faAddressCard },
            title: 'Formulario Persona Unica',
            link: '/mantenimiento/personaunica',
          },
          {
            icon: { name: faHome },
            title: 'Lista de formularios',
            link: '/mantenimiento/lista',
          },
          {
            icon: { name: faPlus },
            title: 'Nuevo Formulario',
            link: '/mantenimiento/nuevo',
          },
        ],
      },
    ]);
  }
}
