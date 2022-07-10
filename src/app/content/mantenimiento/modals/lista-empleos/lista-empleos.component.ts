import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from '@app/@core';
import { Page } from '@app/@shared/models/page';
import { EmpresasList } from '@app/content/perfiles-creados/tablas-model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Observer } from 'rxjs';
import { debounceTime, delay, switchMap } from 'rxjs/operators';
import { Empresas } from '../../inputs/models';

@Component({
	selector: 'prx-lista-empleos',
	templateUrl: './lista-empleos.component.html',
	styleUrls: ['./lista-empleos.component.scss'],
})
export class ListaEmpleosComponent implements OnInit {
	page: Page = { take: 5, pageNumber: 0, totalElements: 0, totalPages: 0 };
	empleos: Empresas[];
	filtro = new FormControl('');
	ColumnMode = ColumnMode;
	@Input() modalRef: BsModalRef;
	@Output() seleccionado: EventEmitter<Empresas> = new EventEmitter();
	chillModalRef: BsModalRef;
	ob: Observer<EmpresasList> = {
		next: (result) => {
			this.empleos = result.data;
			this.page = result.pageData;
		},
		error(err) {
			console.error(err);
		},
		complete() {},
	};
	constructor(
		private api: ApiService,
		private bsmodalService: BsModalService
	) {}

	ngOnInit(): void {
		this.setPage({ offset: 0 });
		this.filtro.valueChanges
			.pipe(debounceTime(500))
			.subscribe((val) =>
				this.api.getEmpresas(this.page, val).subscribe(this.ob)
			);
	}
	setPage(pageInfo: any) {
		this.page.pageNumber = pageInfo.offset;
		this.api.getEmpresas(this.page, this.filtro.value).subscribe(this.ob);
	}
	openModal(template: TemplateRef<any>) {
		this.chillModalRef = this.bsmodalService.show(template, {
			class: 'modal-xl',
		});
	}
	enviarInfo(row: Empresas) {
		this.seleccionado.emit(row);
		this.modalRef.hide();
	}
}
