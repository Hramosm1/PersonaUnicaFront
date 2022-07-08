import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
	Shell.childRoutes([
		{
			path: 'mantenimiento',
			loadChildren: () =>
				import('./content/mantenimiento/mantenimiento.module').then(
					(m) => m.MantenimientoModule
				),
		},
		{
			path: 'perfiles',
			loadChildren: () =>
				import('./content/perfiles-creados/perfiles-creados.module').then(
					(m) => m.PerfilesCreadosModule
				),
		},
	]),

	// Fallback when no prior route is matched
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules,
			scrollPositionRestoration: 'enabled',
			useHash: true,
		}),
	],
	exports: [RouterModule],
	providers: [],
})
export class AppRoutingModule {}
