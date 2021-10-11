import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioPersonaUnicaComponent } from './formulario-persona-unica/formulario-persona-unica.component';
import { NuevoComponent } from './nuevo/nuevo.component';

const routes: Routes = [
  { path: 'nuevo', component: NuevoComponent },
  { path: 'personaunica', component: FormularioPersonaUnicaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientoRoutingModule {}
