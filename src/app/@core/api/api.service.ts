import { Perfil } from 'src/app/content/perfiles-creados/tablas-model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { ModelMapper } from '../mapper/model-mapper';
import { environment } from 'src/environments/environment';
import { Logger } from '../logger.service';
import { TokenService } from '../authentication/token.service';
import { InputsService } from '@app/content/mantenimiento/inputs/inputs.service';
const logger = new Logger('ApiService');

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers = new HttpHeaders({
    Authorization: this.token.Token,
  });
  constructor(private http: HttpClient, private token: TokenService, private inputService: InputsService) {}
  //=================================================================================
  public getGeneros = this.inputService.getGeneros;
  public getTiposDocumento = this.inputService.getTiposDocumento;
  public getTiposPersona = this.inputService.getTiposPersona;
  public getEmpresas = this.inputService.getEmpresas;
  public mantenimientos(
    tipo: 'post' | 'put',
    mantenimiento: 'contactos' | 'correos' | 'direcciones' | 'documentos' | 'empleos' | 'telefonos',
    body?: any,
    id?: string
  ) {
    return this.http[tipo](`${environment.serverUrl}${mantenimiento}/${id}`, body, { headers: this.headers });
  }
  public mantenimientosDelete(
    mantenimiento: 'contactos' | 'correos' | 'direcciones' | 'documentos' | 'empleos' | 'telefonos',
    id: string
  ) {
    return this.http.delete(`${environment.serverUrl}${mantenimiento}/${id}`, { headers: this.headers });
  }
  //=================================================================================
  public getTipos<T>(
    tipo: 'genero' | 'contacto' | 'documento' | 'origen' | 'pagina' | 'persona' | 'telefono'
  ): Observable<Array<T>> {
    return this.http
      .get<Array<T>>(`${environment.serverUrl}tipos/${tipo}/`, { headers: this.headers })
      .pipe(timeout(12000));
  }
  public GetPerfil(id: string): Observable<Perfil> {
    return this.http
      .get<Perfil>(environment.serverUrl + 'perfiles/' + id, { headers: this.headers })
      .pipe(timeout(12000));
  }
  public GetPerfiles<T>(): Observable<Array<T>> {
    return this.http.get<Array<T>>(environment.serverUrl + 'perfiles', { headers: this.headers }).pipe(timeout(12000));
  }
  public PostRespuestaPersonaUnica(body: any) {
    return this.http.post(environment.serverUrl + 'perfiles', body, { headers: this.headers }).pipe(timeout(12000));
  }
  public query<T>(route: string, itemType: any): Observable<T[]> {
    if (!route) {
      return;
    }

    return (
      this.http
        //.cache()
        .get<T[]>(route)
        .pipe(
          map((data: T[]) => {
            logger.debug('API Data', data);

            /**
             * Uncomment this and delete the snippet bellow in case you need to get the plan json response
             * return data;
             */

            // Here we process the Mapping attributes or decorators defined in your Class Models
            return data.map((item: T) => {
              return new ModelMapper<T>(itemType).map(item);
            });
          })
        )
    );
  }

  public get<T>(route: string, itemType: any): Observable<T> {
    if (!route) {
      return;
    }

    return (
      this.http
        //.cache()
        .get<T>(route)
        .pipe(
          map((data: T) => {
            return new ModelMapper<T>(itemType).map(data);
          })
        )
    );
  }
}
