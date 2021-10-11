import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { CamposDirective } from '../campos.directive';
import { FechaComponent } from '../campos/fecha/fecha.component';
import { SeleccionComponent } from '../campos/seleccion/seleccion.component';
import { TelefonoComponent } from '../campos/telefono/telefono.component';
import { TextoCortoComponent } from '../campos/texto-corto/texto-corto.component';
import { TextoLargoComponent } from '../campos/texto-largo/texto-largo.component';

@Component({
  selector: 'prx-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
})
export class NuevoComponent implements OnInit {
  icons = faAngleDown;
  jsonResult: any[] = [];
  tiposDeComponentes = {
    pregunta: { dato: 'hola' },
    parrafo: {},
    selector: {},
    fecha: {},
  };
  @ViewChild(CamposDirective) camposDirective: CamposDirective;
  constructor(private title: Title, private cfr: ComponentFactoryResolver) {}
  ngOnInit(): void {
    this.title.setTitle('Nuevo Formulario');
    Object.keys(this.tiposDeComponentes);
  }
  crearComponente(componente: 'pregunta' | 'parrafo' | 'selec' | 'fecha' | 'telefono') {
    const index = this.camposDirective.containerRef.length;
    let component;
    switch (componente) {
      case 'pregunta':
        component = this.cfr.resolveComponentFactory(TextoCortoComponent);
        this.jsonResult.push({ index: index, tipo: componente, titulo: '' });
        break;
      case 'parrafo':
        component = this.cfr.resolveComponentFactory(TextoLargoComponent);
        this.jsonResult.push({ index: index, tipo: componente, titulo: '' });
        break;
      case 'selec':
        component = this.cfr.resolveComponentFactory(SeleccionComponent);
        this.jsonResult.push({ index: index, tipo: componente, titulo: '', opciones: [] });
        break;
      case 'fecha':
        component = this.cfr.resolveComponentFactory(FechaComponent);
        this.jsonResult.push({ index: index, tipo: componente, titulo: '' });
        break;
      case 'telefono':
        component = this.cfr.resolveComponentFactory(TelefonoComponent);
        this.jsonResult.push({ index: index, tipo: componente, titulo: '' });
        break;
      default:
        break;
    }
    this.camposDirective.containerRef.createComponent(component);
  }
}
