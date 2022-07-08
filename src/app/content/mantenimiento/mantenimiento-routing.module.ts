import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularioPersonaUnicaComponent } from './formulario-persona-unica/formulario-persona-unica.component';
const routes: Routes = [
	{ path: 'personaunica', component: FormularioPersonaUnicaComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MantenimientoRoutingModule {}
