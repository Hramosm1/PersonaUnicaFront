import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	TemplateRef,
} from '@angular/core';
import { ApiService } from '@app/@core';
import { Empresas } from '@app/content/mantenimiento/inputs/models';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { PUEmpleos } from '../../tablas-model';

@Component({
	selector: 'prx-empleos',
	templateUrl: './empleos.component.html',
	styleUrls: ['./empleos.component.scss'],
})
export class EmpleosComponent implements OnInit {
	@Input() empleos: PUEmpleos[];
	empresas: Empresas[];
	modalRef?: BsModalRef;
	idEditar: string;
	btn = false;
	@Output() actualizar = new EventEmitter();
	constructor(private api: ApiService, private modalService: BsModalService) {}

	ngOnInit(): void {}
	eliminar(id: string) {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'btn btn-danger',
				cancelButton: 'btn btn-secondary',
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: 'Esta seguro que desea eliminar',
				text: 'Esta accion es irreversible',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Si, Eliminalo',
				cancelButtonText: 'Cancelar',
				reverseButtons: true,
			})
			.then((result) => {
				if (result.isConfirmed) {
					this.btn = true;
					this.api
						.mantenimientosDelete('empleos', id)
						.pipe(finalize(() => (this.btn = false)))
						.subscribe((res: any) => {
							if (res.error) {
							} else {
								swalWithBootstrapButtons.fire(
									'Eliminado',
									'Empleo Eliminado.',
									'error'
								);
								this.actualizar.emit();
							}
						});
				}
			});
	}
	openModal(template: TemplateRef<any>, id?: string) {
		if (id) {
			this.idEditar = id;
		}
		this.modalRef = this.modalService.show(template);
		this.modalService.onHide.subscribe(() => this.actualizar.emit());
	}
}
