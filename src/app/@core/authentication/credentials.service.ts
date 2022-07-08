import { Injectable } from '@angular/core';

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
	providedIn: 'root',
})
export class CredentialsService {
	private _credentials: any | null = null;

	constructor() {
		const savedCredentials = sessionStorage.getItem(credentialsKey);
		if (savedCredentials) {
			this._credentials = JSON.parse(savedCredentials);
		}
	}

	/**
	 * Checks is the user is authenticated.
	 * @return True if the user is authenticated.
	 */
	isAuthenticated(): boolean {
		return !!this.credentials;
	}

	/**
	 * Gets the user credentials.
	 * @return The user credentials or null if the user is not authenticated.
	 */
	get credentials(): any | null {
		return this._credentials;
	}

	/**
	 * Sets the user credentials.
	 * The credentials may be persisted across sessions by setting the `remember` parameter to true.
	 * Otherwise, the credentials are only persisted for the current session.
	 * @param credentials The user credentials.
	 * @param remember True to remember credentials across sessions.
	 */
	setCredentials(credentials: any, value?: any) {
		this._credentials = credentials;
		sessionStorage.setItem(credentialsKey, JSON.stringify(credentials));
		console.log(value.remember);
		if (value.remember) {
			localStorage.setItem('US', value.username);
			localStorage.setItem('PS', value.password);
			localStorage.setItem('REM', value.remember);
		} else {
			localStorage.removeItem('US');
			localStorage.removeItem('PS');
			localStorage.removeItem('REM');
		}
	}
	clearCredentials() {
		sessionStorage.removeItem(credentialsKey);
	}
}
