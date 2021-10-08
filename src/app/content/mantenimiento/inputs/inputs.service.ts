import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresas, Generos, TiposDocumento, TiposPersona } from './models'
import { TokenService } from "@core/authentication/token.service";


@Injectable({
  providedIn: 'root'
})
export class InputsService {
  private headers = new HttpHeaders({
    'Authorization': this.token.Token
  })
  constructor(private http: HttpClient, private token: TokenService) { }
  public getGeneros(): Observable<Array<Generos>> {
    return this.http.get<Array<Generos>>('genero', { headers: this.headers })
  }
  public getTiposDocumento(): Observable<Array<TiposDocumento>> {
    return this.http.get<Array<TiposDocumento>>('tipodocumento', { headers: this.headers })
  }
  public getTiposPersona(): Observable<Array<TiposPersona>> {
    return this.http.get<Array<TiposPersona>>('tipopersona', { headers: this.headers })
  }
  public getEmpresas(): Observable<Array<Empresas>> {
    return this.http.get<Array<Empresas>>('empresas', { headers: this.headers })
  }
}
