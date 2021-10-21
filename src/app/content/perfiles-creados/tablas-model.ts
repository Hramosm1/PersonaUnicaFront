export interface Perfil {
  id: string;
  observaciones: string;
  razonSocial: string;
  genero: number;
  fecha: Date;
  primerApellido: string;
  segundoApellido: string;
  PU_Nombres: PUNombres[];
  PU_Contactos: PUContactos[];
  PU_Correos: PUCorreos[];
  PU_Direcciones: PUDirecciones[];
  PU_Documentos: PUDocumentos[];
  PU_Telefonos: PUTelefonos[];
  PU_ReferenciasWeb: PUReferenciasWeb[];
  empleos: PUEmpleos[];
  personaUnica: boolean;
}
export interface Listado {
  documento: string;
  tipoPersona: string;
  fecha: string;
  primerApellido: string;
  segundoApellido: string;
  razonSocial: string;
}
export interface PUNombres {
  id: string;
  idPerfil: string;
  nombre: string;
}
export interface PUDocumentos {
  id: string;
  idPerfil: string;
  documento: string;
  tipo: number;
}
export interface PUContactos {
  id: string;
  idPerfil: string;
  nombreCompleto: string;
  origenInformacion: number;
  tipoContacto: number;
}
export interface PUCorreos {
  id: string;
  idPerfil: string;
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
  origenInformacion: number;
  idPerfil: string;
}
export interface PUTelefonos {
  id: string;
  idPerfil: string;
  codigoPais: string;
  telefono: string;
  tipoTelefono: number;
  origenInformacion: number;
}
export interface PUReferenciasWeb {
  id: string;
  idPerfil: string;
  tipo: number;
  origenInformacion: number;
  link: string;
}
export interface PUEmpleos {
  empresa: string;
  fechaFin: Date;
  fechaInicio: Date;
  id: string;
  idPerfil: string;
  origenInformacion: Number;
  puesto: string;
}
