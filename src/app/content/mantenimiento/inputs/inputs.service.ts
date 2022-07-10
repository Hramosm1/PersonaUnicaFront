import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Generos, TiposDocumento, TiposPersona } from './models';
import { TokenService } from '@core/authentication/token.service';
import { Page } from '@app/@shared/models/page';
import { EmpresasList } from '@app/content/perfiles-creados/tablas-model';

@Injectable({
	providedIn: 'root',
})
export class InputsService {
	private headers = new HttpHeaders({
		Authorization: this.token.Token,
	});
	constructor(private http: HttpClient, private token: TokenService) {}
	public getGeneros(): Observable<Array<Generos>> {
		return this.http.get<Array<Generos>>('tipos/genero', {
			headers: this.headers,
		});
	}
	public getTiposDocumento(): Observable<Array<TiposDocumento>> {
		return this.http.get<Array<TiposDocumento>>('tipos/documento', {
			headers: this.headers,
		});
	}
	public getTiposPersona(): Observable<Array<TiposPersona>> {
		return this.http.get<Array<TiposPersona>>('tipos/persona', {
			headers: this.headers,
		});
	}
	public getEmpresas(page: Page, filter: string): Observable<EmpresasList> {
		return this.http.get<EmpresasList>(
			`empresas/${page.take}/${page.pageNumber}/${filter}`,
			{ headers: this.headers }
		);
	}
}
