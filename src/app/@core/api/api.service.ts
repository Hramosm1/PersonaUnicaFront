import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelMapper } from '../mapper/model-mapper';
import { environment } from 'src/environments/environment';
import { Logger } from '../logger.service';
import { TokenService } from '../authentication/token.service';
import { InputsService } from '@app/content/mantenimiento/inputs/inputs.service';
import { PerfilPersona } from '@app/content/mantenimiento/inputs/models';
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
  //=================================================================================
  public GetPerfil(id: string): Observable<PerfilPersona> {
    return this.http.get<PerfilPersona>(environment.serverUrl + 'perfiles/' + id, { headers: this.headers });
  }
  public GetPerfiles(): Observable<Array<PerfilPersona>> {
    return this.http.get<Array<PerfilPersona>>(environment.serverUrl + 'perfiles', { headers: this.headers });
  }
  public PostRespuestaPersonaUnica(body: any) {
    return this.http.post(environment.serverUrl + 'perfiles', body, { headers: this.headers });
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
