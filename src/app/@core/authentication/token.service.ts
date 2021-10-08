import { Injectable } from '@angular/core';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private _tokenActive: boolean = false;

  constructor(private credentialsService: CredentialsService) {}

  get Token() {
    const credentials = this.credentialsService.credentials;

    return credentials ? credentials.token : null;
  }

  isTokenExpired() {
    return false;
  }

  isTokenActive(): boolean {
    const token = this.Token;

    if (token) {
      this._tokenActive = !this.isTokenExpired();
    }

    return this._tokenActive;
  }

  tokenRequired() {
    console.log('Token is expired');
    return false;
  }
}
