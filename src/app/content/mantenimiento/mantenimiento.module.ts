import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { CardsModule } from '@app/blocks/cards/cards.module';
import { DatePickersModule } from '@app/blocks/date-pickers/date-pickers.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@app/blocks/icons/icons.module';
import { CamposDirective } from './campos.directive';
import { TextoCortoComponent } from './campos/texto-corto/texto-corto.component';
import { TextoLargoComponent } from './campos/texto-largo/texto-largo.component';
import { SeleccionComponent } from './campos/seleccion/seleccion.component';
import { NavigationsModule } from '@app/blocks/navigations/navigations.module';
import { FechaComponent } from './campos/fecha/fecha.component';
import { TelefonoComponent } from './campos/telefono/telefono.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormularioPersonaUnicaComponent } from './formulario-persona-unica/formulario-persona-unica.component';
import { NombresComponent } from './inputs/nombres/nombres.component';
import { CorreosComponent } from './inputs/correos/correos.component';
import { DireccionesComponent } from './inputs/direcciones/direcciones.component';
import { TelefonosComponent } from './inputs/telefonos/telefonos.component';
import { EmpleosComponent } from './inputs/empleos/empleos.component';
import { DocumentosComponent } from './inputs/documentos/documentos.component';
import { UtilsModule } from '@app/blocks/utils';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ListaEmpleosComponent } from './modals/lista-empleos/lista-empleos.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NuevaEmpresaComponent } from './modals/nueva-empresa/nueva-empresa.component';
import { TipoDocumentoPipe } from './pipes/tipo-documento.pipe';
import { FiltroEmpresasPipe } from './pipes/filtro-empresas.pipe';
import { ContactosComponent } from './inputs/contactos/contactos.component';
import { ReferenciasWebComponent } from './inputs/referencias-web/referencias-web.component';
import { AvatarsModule } from '@app/blocks/avatars/avatars.module';

@NgModule({
  declarations: [
    CamposDirective,
    TextoCortoComponent,
    TextoLargoComponent,
    SeleccionComponent,
    FechaComponent,
    TelefonoComponent,
    FormularioPersonaUnicaComponent,
    NombresComponent,
    CorreosComponent,
    DireccionesComponent,
    TelefonosComponent,
    EmpleosComponent,
    DocumentosComponent,
    ListaEmpleosComponent,
    NuevaEmpresaComponent,
    TipoDocumentoPipe,
    FiltroEmpresasPipe,
    ContactosComponent,
    ReferenciasWebComponent,
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule,
    CardsModule,
    DatePickersModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    NavigationsModule,
    UtilsModule,
    BsDatepickerModule,
    ModalModule,
    NgxDatatableModule,
    AvatarsModule,
  ],
  exports: [ListaEmpleosComponent],
})
export class MantenimientoModule {}
