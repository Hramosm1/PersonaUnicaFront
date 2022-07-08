import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiService } from '@app/@core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Listado } from '../tablas-model';
import { Page } from '@shared/models/page';
import { Observer } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { omitBy, isNull } from 'lodash';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
	selector: 'prx-listado',
	templateUrl: './listado.component.html',
	styleUrls: ['./listado.component.scss'],
})
export class ListadoComponent implements OnInit {
	formulario = this.fb.group({
		primerApellido: [],
		segundoApellido: [],
		razonSocial: [],
		nombre: [],
		documento: [],
		tipo: [],
	});
	filtros: boolean = false;
	modalRef: BsModalRef;
	filtro = faFilter;
	page: Page = { pageNumber: 0, take: 10, totalElements: 0, totalPages: 0 };
	cm = ColumnMode;
	rows: any[];
	isLoading: boolean = true;
	ob: Observer<Listado> = {
		next: (data) => {
			this.isLoading = true;
			this.page = data.pageData;
			this.rows = data.data;
		},
		error: (err) => console.error(err),
		complete: () => (this.isLoading = false),
	};
	get tipo() {
		return this.formulario.controls.tipo.valueChanges;
	}
	constructor(
		private api: ApiService,
		private fb: FormBuilder,
		private modalService: BsModalService
	) {}
	ngOnInit(): void {
		this.setPage({ offset: 0 });
	}
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, {
			class: 'modal-xl modal-dialog-scrollable',
		});
	}
	cancel() {
		this.filtros = false;
		this.formulario.reset();
		this.modalRef.hide();
	}
	reset() {
		this.filtros = false;
		this.formulario.reset();
		this.api
			.GetPerfiles(this.page, omitBy(this.formulario.value, isNull))
			.subscribe(this.ob);
	}
	busqueda() {
		const obfil = omitBy(this.formulario.value, isNull);
		if (Object.keys(obfil).length > 0) {
			this.filtros = true;
		}
		this.page.pageNumber = 0;
		this.api.GetPerfiles(this.page, obfil).subscribe(this.ob);
		this.modalRef.hide();
	}
	setPage(pageInfo: any) {
		this.page.pageNumber = pageInfo.offset;
		this.api
			.GetPerfiles(this.page, omitBy(this.formulario.value, isNull))
			.subscribe(this.ob);
	}
	getNombres(nombres: Array<{ nombre: string }>) {
		return nombres.map(({ nombre }) => nombre).join(' ');
	}
}
