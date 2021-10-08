import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Logger, AuthenticationService, BaseFormComponent, CredentialsService } from '@core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { faCheck, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { faUser, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { finalize } from 'rxjs/operators';
import { RedirectService } from '@core/services/redirect.service';
import { Title } from '@angular/platform-browser';

const log = new Logger('Login');

@Component({
  selector: 'prx-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
})
export class AuthLoginComponent extends BaseFormComponent implements OnInit {
  longArrowAltRight = faLongArrowAltRight;
  faUser = faUser;
  faArrowAltCircleRight = faArrowAltCircleRight;
  check = faCheck;

  constructor(
    private title: Title,
    //private router: Router,
    private _redirect: RedirectService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService
  ) {
    super();
    this.isLoading = false;
    this.createForm();
  }

  ngOnInit() {
    this.title.setTitle('Login');
  }

  /**
   * Logs-in the user
   * @param form The form value: user + password
   */
  login({ valid, value }: { valid: boolean; value: any }) {
    if (valid) {
      this.isLoading = true;

      this.authenticationService
        .login(value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(
          (credentials) => {
            if (credentials.token) {
              console.log(credentials);
              this.credentialsService.setCredentials(credentials, value);
              this.route.queryParams.subscribe((params) => this.redirect(params));
            }
          },
          (error) => {
            log.debug(`Login error: ${error}`);
            this.error = error;
          }
        );
    }
  }

  redirect(params: Params) {
    if (params.redirect) {
      this._redirect.to(params.redirect, { replaceUrl: true });
    } else {
      this._redirect.toHome();
    }
  }

  private createForm() {
    const us: string = localStorage.getItem('US') || 'user';
    const pas: string = localStorage.getItem('PS') || '';
    const remem: boolean = localStorage.getItem('REM') === 'true' || false;
    this.form = this.formBuilder.group({
      username: [us, Validators.required],
      password: [pas, Validators.required],
      remember: remem,
    });
  }
}
