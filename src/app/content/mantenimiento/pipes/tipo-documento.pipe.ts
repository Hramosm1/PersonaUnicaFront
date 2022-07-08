import { Pipe, PipeTransform } from '@angular/core';
import { TiposDocumento } from '../inputs/models';

@Pipe({
	name: 'tipoDocumento',
})
export class TipoDocumentoPipe implements PipeTransform {
	transform(
		tiposDeDocumentos: Array<TiposDocumento>,
		tipoPersona: number
	): Array<TiposDocumento> {
		if (tipoPersona == 1) {
			return tiposDeDocumentos;
		} else {
			const res = tiposDeDocumentos.filter((tipo) => {
				return tipo.tipoDocumento == 'igss' || tipo.tipoDocumento == 'nit';
			});
			return res;
		}
	}
}
