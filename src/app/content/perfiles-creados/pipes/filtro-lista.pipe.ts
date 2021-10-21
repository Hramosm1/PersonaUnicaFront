import { Pipe, PipeTransform } from '@angular/core';
import { Listado } from '../tablas-model';

@Pipe({
  name: 'filtroLista',
})
export class FiltroListaPipe implements PipeTransform {
  transform(lista: Listado[], filtro: string): Listado[] {
    if (filtro == '') {
      return lista;
    } else {
      const filtroUp = filtro.toUpperCase();
      return lista.filter((perfil) => {
        const { tipoPersona, documento, razonSocial, primerApellido, segundoApellido, fecha } = perfil;
        return (
          documento?.toUpperCase().includes(filtroUp) ||
          razonSocial?.toUpperCase().includes(filtroUp) ||
          primerApellido?.toUpperCase().includes(filtroUp) ||
          segundoApellido?.toUpperCase().includes(filtroUp) ||
          tipoPersona?.toUpperCase().includes(filtroUp) ||
          new Date(fecha).toLocaleDateString()?.includes(filtroUp)
        );
      });
    }
  }
}
