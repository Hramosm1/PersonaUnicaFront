import { ListadoComponent } from './listado/listado.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
	{ path: '', redirectTo: 'listado', pathMatch: 'full' },
	{ path: 'listado', component: ListadoComponent },
	{ path: 'perfil/:id', component: PerfilComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PerfilesCreadosRoutingModule {}
