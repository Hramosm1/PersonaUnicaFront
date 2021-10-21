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
        const { PU_Documentos, razonSocial, primerApellido, segundoApellido } = perfil;
        let doc = '';
        if (PU_Documentos.length > 0) {
          doc = PU_Documentos[0].documento;
        }
        return (
          doc?.includes(filtroUp) ||
          razonSocial?.toUpperCase().includes(filtroUp) ||
          primerApellido?.toUpperCase().includes(filtroUp) ||
          segundoApellido?.toUpperCase().includes(filtroUp)
        );
      });
    }
  }
}
