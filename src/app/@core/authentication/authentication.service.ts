import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { CredentialsService } from './credentials.service';
import { LoginContext, RegisterContext, AuthorizationEntity } from './authentication.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Router } from '@angular/router';

/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedIn: boolean;

  get isAuthenticated() {
    return this.loggedIn;
  }

  constructor(private credentialsService: CredentialsService , private http:HttpClient, private router:Router) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    return this.http.post(environment.serverUrl+'login/',context)
  }

  /**
   * Registers the user.
   * @param context The register parameters.
   * @return The user credentials.
   */
  register(context: RegisterContext) {
    // Replace by proper registration call
  
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout() {
    this.credentialsService.clearCredentials()
    this.router.navigateByUrl('/login')
  }
}
