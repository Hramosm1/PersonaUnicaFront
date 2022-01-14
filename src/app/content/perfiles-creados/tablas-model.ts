export interface Perfil {
  id: string;
  observaciones: string;
  razonSocial: string;
  genero: number;
  fecha: Date;
  primerApellido: string;
  segundoApellido: string;
  nombres: PUNombres[];
  contactos: PUContactos[];
  correos: PUCorreos[];
  direcciones: PUDirecciones[];
  documentos: PUDocumentos[];
  telefonos: PUTelefonos[];
  referenciasWeb: PUReferenciasWeb[];
  empleos: PUEmpleos[];
  personaUnica: boolean;
  tipo: number;
  tipoPersona: string;
}
export interface Listado {
  documento: string;
  tipoPersona: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  razonSocial: string;
}
export interface PUNombres {
  id: string;
  nombre: string;
}
export interface PUDocumentos {
  id: string;
  documento: string;
  tipo: string;
}
export interface PUContactos {
  id: string;
  nombreCompleto: string;
  telefono: string;
  origenInformacion: string;
  tipoContacto: string;
}
export interface PUCorreos {
  id: string;
  correo: string;
}

export interface PUDirecciones {
  id: string;
  departamento: string;
  municipio: string;
  zona: number;
  colonia: string;
  direccion: string;
  referencia: string;
  origenInformacion: string;
}
export interface PUTelefonos {
  id: string;
  codigoPais: string;
  telefono: string;
  tipoTelefono: string;
  origenInformacion: string;
}
export interface PUReferenciasWeb {
  id: string;
  tipo: string;
  origenInformacion: string;
  link: string;
}
export interface PUEmpleos {
  id: string;
  fechaInicio: Date;
  fechaFin: Date;
  empresa: string;
  origenInformacion: string;
  puesto: string;
}
