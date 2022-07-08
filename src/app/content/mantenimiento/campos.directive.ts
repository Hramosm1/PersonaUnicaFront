import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[prxCampos]',
})
export class CamposDirective {
	constructor(public containerRef: ViewContainerRef) {}
}
