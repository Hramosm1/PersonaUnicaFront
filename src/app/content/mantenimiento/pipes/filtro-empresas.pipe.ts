import { Pipe, PipeTransform } from '@angular/core';
import { Empresas } from '../inputs/models';

@Pipe({
  name: 'filtroEmpresas',
})
export class FiltroEmpresasPipe implements PipeTransform {
  transform(empresas: Array<Empresas>, input: string): Array<Empresas> {
    input = input.toUpperCase();
    if (input == '') {
      return empresas;
    } else {
      return empresas.filter((empresa) => {
        return empresa.nombre.toUpperCase().includes(input) || empresa.razonSocial.toUpperCase().includes(input);
      });
    }
  }
}
