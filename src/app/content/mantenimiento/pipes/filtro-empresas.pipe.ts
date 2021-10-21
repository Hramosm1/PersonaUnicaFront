import { Pipe, PipeTransform } from '@angular/core';
import { Empresas } from '../inputs/models';

@Pipe({
  name: 'filtroEmpresas',
})
export class FiltroEmpresasPipe implements PipeTransform {
  transform(empresas: Array<Empresas>, input: string): Array<Empresas> {
    const up = input.toUpperCase();
    if (input == '') {
      return empresas;
    } else {
      return empresas.filter((empresa) => {
        const { nombre, razonSocial } = empresa;
        return nombre?.toUpperCase().includes(up) || razonSocial?.toUpperCase().includes(up);
      });
    }
  }
}
