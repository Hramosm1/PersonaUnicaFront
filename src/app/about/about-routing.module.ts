import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
	// Module is lazy loaded, see app-routing.module.ts
	{ path: '', component: AboutComponent, data: { title: extract('About') } },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [],
})
export class AboutRoutingModule {}
