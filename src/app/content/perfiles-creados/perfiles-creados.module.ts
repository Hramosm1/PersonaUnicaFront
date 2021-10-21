import { PerfilComponent } from './perfil/perfil.component';
import { ListadoComponent } from './listado/listado.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilesCreadosRoutingModule } from './perfiles-creados-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarsModule } from '@app/blocks/avatars/avatars.module';
import { UtilsModule } from '@app/blocks/utils';
import { CardsModule } from '@app/blocks/cards/cards.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TelefonosComponent } from './components/telefonos/telefonos.component';
import { DireccionesComponent } from './components/direcciones/direcciones.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { DocumentosComponent } from './components/documentos/documentos.component';
import { CorreosComponent } from './components/correos/correos.component';
import { EmpleosComponent } from './components/empleos/empleos.component';
import { FormEmpleoComponent } from './forms/form-empleo/form-empleo.component';
import { FormContactosComponent } from './forms/form-contactos/form-contactos.component';
import { FormDocumentosComponent } from './forms/form-documentos/form-documentos.component';
import { FormTelefonosComponent } from './forms/form-telefonos/form-telefonos.component';
import { FormDireccionesComponent } from './forms/form-direcciones/form-direcciones.component';
import { FormCorreosComponent } from './forms/form-correos/form-correos.component';
import { IconsModule } from '@app/blocks/icons/icons.module';
import { FiltroListaPipe } from './pipes/filtro-lista.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NombresComponent } from './components/nombres/nombres.component';

@NgModule({
  declarations: [
    ListadoComponent,
    PerfilComponent,
    TelefonosComponent,
    DireccionesComponent,
    ContactosComponent,
    DocumentosComponent,
    CorreosComponent,
    EmpleosComponent,
    FormEmpleoComponent,
    FormContactosComponent,
    FormDocumentosComponent,
    FormTelefonosComponent,
    FormDireccionesComponent,
    FormCorreosComponent,
    FiltroListaPipe,
    NombresComponent,
  ],
  imports: [
    CommonModule,
    PerfilesCreadosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarsModule,
    UtilsModule,
    CardsModule,
    NgxDatatableModule,
    IconsModule,
    BsDatepickerModule.forRoot(),
  ],
})
export class PerfilesCreadosModule {}
