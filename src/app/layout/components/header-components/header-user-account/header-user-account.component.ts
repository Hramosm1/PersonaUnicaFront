import { Component, OnInit } from '@angular/core';
import { AuthenticationService, BaseComponent, CredentialsService } from '@core';
import { Router } from '@angular/router';

@Component({
  selector: 'prx-header-user-account',
  templateUrl: './header-user-account.component.html',
  styleUrls: ['./header-user-account.component.scss'],
})
export class HeaderUserAccountComponent extends BaseComponent implements OnInit {
  user: any;
  constructor(private service: CredentialsService, private router: Router, private auth: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.user = this.service.credentials;
  }

  logout() {
    this.auth.logout();
  }

  redirect() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
