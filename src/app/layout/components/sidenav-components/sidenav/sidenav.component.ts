import {
	Component,
	OnInit,
	HostBinding,
	Input,
	Output,
	EventEmitter,
	HostListener,
} from '@angular/core';
import { AuthenticationService, CredentialsService, Logger } from '@core';
import { Router } from '@angular/router';
import {
	faInbox,
	faLock,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from '@app/layout/services/navigation.service';
import { NavigationOptions } from '@app/layout/models/navigation';

const logger = new Logger('SidenavComponent');

@Component({
	selector: 'prx-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
	host: { class: 'sidenav' },
})
export class SidenavComponent implements OnInit {
	@HostBinding('class.fixed')
	@Input()
	fixed: boolean;

	@HostBinding('class.hover')
	hover: boolean;

	@HostListener('mouseenter')
	onMouseOver() {
		this.hover = true;
	}

	@HostListener('mouseleave')
	onMouseLeave() {
		this.hover = false;
	}

	user: any;
	avatar = {
		picture: 'https://manskkp.lv/assets/images/users/default-user.png',
		name: 'pauline myers',
		status: 'online',
	};
	icons = {
		faInbox,
		faLock,
		faSignOutAlt,
	};

	navGroups: NavigationOptions[];

	@Output()
	sideNavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

	@HostBinding('class.collapsed')
	@Input()
	collapsed: boolean;

	constructor(
		private navigation: NavigationService,
		private service: CredentialsService
	) {}

	ngOnInit() {
		this.user = this.service.credentials;
		this.navigation
			.getNavigationItems()
			.subscribe((groups) => (this.navGroups = groups));
	}

	toggleSidenav() {
		this.collapsed = !this.collapsed;
		this.sideNavToggled.emit(this.collapsed);
	}

	logout() {}

	onNavLinkToggle(isOpen: boolean) {
		logger.debug(`Nav link toggled ${isOpen}`);
	}
}
