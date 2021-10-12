import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioPersonaUnicaComponent } from './formulario-persona-unica/formulario-persona-unica.component';
import { ListadoComponent } from './listado/listado.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: 'personaunica', component: FormularioPersonaUnicaComponent },
  { path: 'listado', component: ListadoComponent },
  { path: 'perfil/:id', component: PerfilComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientoRoutingModule {}
