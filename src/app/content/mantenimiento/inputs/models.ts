export interface Generos {
  id: number;
  genero: string;
}
export interface TiposDocumento {
  id: number;
  tipo_documento: string;
}
export interface TiposPersona {
  id: number;
  tipo_persona: string;
}
export interface Empresas {
  id: string;
  nombre: string;
  razon_social: string;
  observaciones: string;
}
export interface PerfilPersona {
  id: string;
  nombre_ejecutivo: string;
  fecha_creacion: Date;
  respuesta_json: string;
}
